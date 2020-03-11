import { UserInputError } from 'apollo-server';

import pubsub from '../services/pubsub';

import Project from './models/project';
import Feature from './models/feature';

const projectMutations = {
  createProject: async (root, args) => {
    const project = new Project({
      name: args.name,
      description: args.description,
      features: args.features || [],
      price: args.price,
      participants: [],
      endTime: args.endTime
    });
    await project.save().catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });

    await Project.populate(project, 'features').populate(project, 'customers');
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
  }
};

export default projectMutations;
