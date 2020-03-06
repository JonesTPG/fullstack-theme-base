const { UserInputError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Feedback = require('./models/feedback');
const Contact = require('./models/contact');
const Project = require('./models/project');
const Feature = require('./models/feature');
const Customer = require('./models/customer');

const userMutations = require('./mutations/user');
const customerMutations = require('./mutations/customer');
const projectMutations = require('./mutations/project');

const config = require('./utils/config');

const pubsub = require('./services/pubsub');

const resolvers = {
  Query: {
    hello: () => {
      return 'world';
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    feedback: () => {
      return Feedback.find({}).populate('user');
    },
    contact: () => {
      return Contact.find({}).populate('user');
    },
    project: () => {
      return Project.find({})
        .populate('features')
        .populate('participants');
    },
    feature: () => {
      return Feature.find({});
    },
    user: () => {
      return User.find({});
    },
    customer: () => {
      return Customer.find({}).populate('projects');
    }
  },
  Mutation: {
    createFeedback: async (root, args, context) => {
      let feedback = new Feedback({
        type: args.type,
        user: context.currentUser ? context.currentUser._id : null
      });

      await feedback.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      await Feedback.populate(feedback, 'user');

      pubsub.publish('FEEDBACK_ADDED', {
        feedbackAdded: feedback
      });
      return feedback;
    },
    createContact: async (root, args, context) => {
      let contact = new Contact({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        company: args.company,
        message: args.message,
        user: context.currentUser ? context.currentUser._id : null
      });
      await contact.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      await Contact.populate(contact, 'user');
      pubsub.publish('CONTACT_ADDED', {
        contactAdded: contact
      });
      return contact;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError('wrong credentials');
      }

      const tokenData = {
        username: user.username,
        id: user._id
      };
      pubsub.publish('USER_LOGGED_IN', {
        userLoggedIn: user
      });
      return {
        value: jwt.sign(tokenData, config.JWT_SECRET),
        roles: user.roles,
        darkTheme: user.darkTheme
      };
    },
    resetDatabase: async () => {
      if (process.env.NODE_ENV === 'test') {
        await User.deleteMany({});
        await Contact.deleteMany({});
        await Feedback.deleteMany({});
        return true;
      } else {
        throw new Error('user deleting prohibited in production');
      }
    },
    changeTheme: async (root, args, context) => {
      if (!context.currentUser) {
        pubsub.publish('USER_CHANGED_THEME', {
          userChangedTheme: null
        });
        return null;
      }
      const user = await User.findById(context.currentUser._id);
      user.darkTheme = !user.darkTheme;
      await user.save();

      pubsub.publish('USER_CHANGED_THEME', {
        userChangedTheme: user
      });

      return user.darkTheme;
    },
    ...userMutations,
    ...customerMutations,
    ...projectMutations
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator(['USER_UPDATED'])
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator(['USER_DELETED'])
    },
    feedbackAdded: {
      subscribe: () => pubsub.asyncIterator(['FEEDBACK_ADDED'])
    },
    userLoggedIn: {
      subscribe: () => pubsub.asyncIterator(['USER_LOGGED_IN'])
    },
    userChangedTheme: {
      subscribe: () => pubsub.asyncIterator(['USER_CHANGED_THEME'])
    },
    contactAdded: {
      subscribe: () => pubsub.asyncIterator(['CONTACT_ADDED'])
    },
    projectAdded: {
      subscribe: () => pubsub.asyncIterator(['PROJECT_ADDED'])
    },
    featureAdded: {
      subscribe: () => pubsub.asyncIterator(['FEATURE_ADDED'])
    },
    customerAdded: {
      subscribe: () => pubsub.asyncIterator(['CUSTOMER_ADDED'])
    },
    customerUpdated: {
      subscribe: () => pubsub.asyncIterator(['CUSTOMER_UPDATED'])
    },
    customerDeleted: {
      subscribe: () => pubsub.asyncIterator(['CUSTOMER_DELETED'])
    },
    newParticipation: {
      subscribe: () => pubsub.asyncIterator(['NEW_PARTICIPANT'])
    }
  }
};

module.exports = resolvers;
