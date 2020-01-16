const { UserInputError, PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Feedback = require("./models/feedback");

const config = require("./utils/config");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    hello: () => {
      return "world";
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    feedback: () => {
      return Feedback.find({});
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        roles: ["DEFAULT"]
      });

      await user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      pubsub.publish("USER_ADDED", { userAdded: user });
      return user;
    },
    createAdminUser: async (root, args) => {
      if (process.env.NODE_ENV === "test") {
        const adminUser = new User({
          username: args.username,
          roles: ["ADMIN"]
        });

        await adminUser.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        });

        pubsub.publish("USER_ADDED", { userAdded: adminUser });
        return adminUser;
      } else {
        throw new Error("Admin user cannot be created in production.");
      }
    },
    createFeedback: async args => {
      const feedback = new Feedback({
        type: args.type,
        user: args.userId
      });

      await feedback.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      pubsub.publish("FEEDBACK_ADDED", { feedbackAdded: feedback });
      return feedback;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
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
      if (process.env.NODE_ENV === "test") {
        await User.deleteMany({});
        return true;
      } else {
        throw new Error("user deleting prohibited in production");
        return false;
      }
    }
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"])
    },
    feedbackAdded: {
      subscribe: () => pubsub.asyncIterator(["FEEDBACK_ADDED"])
    }
  }
};

module.exports = resolvers;
