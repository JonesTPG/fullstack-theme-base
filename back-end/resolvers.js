const { UserInputError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Feedback = require('./models/feedback');
const Contact = require('./models/contact');
const Project = require('./models/project');
const Feature = require('./models/feature');

const config = require('./utils/config');

const pubsub = new PubSub();

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
      return Project.find({}).populate('features');
    },
    feature: () => {
      return Feature.find({});
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      let password = args.password;
      if (args.password == undefined) {
        password = 'secret';
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username: args.username,
        roles: ['DEFAULT'],
        darkTheme: false,
        passwordHash: passwordHash,
        firstName: args.firstName,
        lastName: args.lastName
      });

      await user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      pubsub.publish('USER_ADDED', { userAdded: user });
      return user;
    },
    createAdminUser: async (root, args) => {
      if (process.env.NODE_ENV === 'test') {
        const ADMIN_PASSWORD = 'admin';

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

        const adminUser = new User({
          username: args.username,
          roles: ['ADMIN'],
          darkTheme: false,
          passwordHash: passwordHash
        });

        await adminUser.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        });

        pubsub.publish('USER_ADDED', { userAdded: adminUser });
        return adminUser;
      } else {
        throw new Error('Admin user cannot be created in production.');
      }
    },
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
      const user = await User.findById(context.currentUser._id);
      user.darkTheme = !user.darkTheme;
      await user.save();

      pubsub.publish('USER_CHANGED_THEME', {
        userChangedTheme: user
      });

      return user.darkTheme;
    },
    createProject: async (root, args) => {
      const project = new Project({
        name: args.name,
        description: args.description,
        features: args.features,
        price: args.price,
        participants: 0,
        endTime: args.endTime
      });
      await project.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      await Project.populate(project, 'features');
      pubsub.publish('PROJECT_ADDED', {
        projectAdded: project
      });
      return project;
    },
    createFeature: async (root, args) => {
      const feature = new Feature({
        name: args.name,
        description: args.description,
        imgUrl: args.imgUrl
      });
      await feature.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
      pubsub.publish('FEATURE_ADDED', {
        featureAdded: feature
      });
      return feature;
    },
    participate: async (root, args) => {
      let project = await Project.findById(args.projectId);
      project = await project.update({
        ...project,
        participants: project.participants + 1
      });
      await Project.populate(project, 'features');
      pubsub.publish('NEW_PARTICIPANT', {
        newParticipation: project
      });
      return project;
    }
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
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
    newParticipation: {
      subscribe: () => pubsub.asyncIterator(['NEW_PARTICIPANT'])
    }
  }
};

module.exports = resolvers;
