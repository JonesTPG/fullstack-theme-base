const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const pubsub = require('../services/pubsub');
const User = require('../models/user');

const userMutations = {
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
  updateUser: async (root, args) => {
    const user = await User.findById(args.id);
    const updatedUser = {
      username: args.username || user.username,
      roles: args.roles || user.roles,
      darkTheme: args.darkTheme || user.darkTheme,
      firstName: args.firstName || user.firstName,
      lastName: args.lastName || user.lastName,
      id: user._id,
      __v: user.__v
    };
    await user.updateOne(updatedUser).catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });
    pubsub.publish('USER_UPDATED', {
      userUpdated: updatedUser
    });
    return updatedUser;
  },
  removeUser: async (root, args) => {
    const user = await User.findByIdAndRemove(args.id).catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });
    pubsub.publish('USER_DELETED', {
      userDeleted: user
    });
    return user;
  },
  createAdminUser: async (root, args) => {
    if (process.env.NODE_ENV === 'test') {
      const ADMIN_PASSWORD = 'admin';

      //const saltRounds = 10;
      //const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

      const adminUser = new User({
        username: args.username,
        roles: ['ADMIN'],
        darkTheme: false,
        passwordHash: ADMIN_PASSWORD
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
  }
};

module.exports = userMutations;
