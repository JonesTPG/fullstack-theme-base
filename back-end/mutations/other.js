const { UserInputError } = require('apollo-server');
const pubsub = require('../services/pubsub');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../utils/config');
const User = require('../models/user');
const Feedback = require('../models/feedback');
const Contact = require('../models/contact');

const otherMutations = {
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
  }
};

module.exports = otherMutations;
