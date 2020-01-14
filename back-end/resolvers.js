const { UserInputError, PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const config = require("./utils/config");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    hello: () => {
      return "world";
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username
      });

      await user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      pubsub.publish("USER_ADDED", { userAdded: user });
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
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
    }
  }
};

module.exports = resolvers;
