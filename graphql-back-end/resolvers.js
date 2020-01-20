const { UserInputError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Feedback = require('./models/feedback');

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
        const adminUser = new User({
          username: args.username,
          roles: ['ADMIN']
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
        user: context.currentUser._id
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
      return {
        value: jwt.sign(tokenData, config.JWT_SECRET),
        roles: user.roles
      };
    },
    deleteUsers: async () => {
      if (process.env.NODE_ENV === 'test') {
        await User.deleteMany({});
        return true;
      } else {
        throw new Error('user deleting prohibited in production');
      }
    },
    changeTheme: async (root, args, context) => {
      const user = await User.findById(context.currentUser._id);
      user.darkTheme = !user.darkTheme;
      await user.save();
      return true;
    }
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    },
    feedbackAdded: {
      subscribe: () => pubsub.asyncIterator(['FEEDBACK_ADDED'])
    }
  }
};

module.exports = resolvers;
