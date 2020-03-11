import User from './models/user';
import Feedback from './models/feedback';
import Contact from './models/contact';
import Project from './models/project';
import Feature from './models/feature';
import Customer from './models/customer';

import userMutations from './mutations/user';
import customerMutations from './mutations/customer';
import projectMutations from './mutations/project';
import otherMutations from './mutations/other';

import pubsub from './services/pubsub';

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

export default resolvers;
