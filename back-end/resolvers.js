const User = require('./models/user');
const Feedback = require('./models/feedback');
const Contact = require('./models/contact');
const Project = require('./models/project');
const Feature = require('./models/feature');
const Customer = require('./models/customer');
const Restaurant = require('./models/restaurant');

const userMutations = require('./mutations/user');
const customerMutations = require('./mutations/customer');
const projectMutations = require('./mutations/project');
const otherMutations = require('./mutations/other');

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
    },
    restaurant: () => {
      return Restaurant.find({});
    }
  },
  Mutation: {
    ...otherMutations,
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
