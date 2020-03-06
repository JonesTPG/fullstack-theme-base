const { UserInputError } = require('apollo-server');
const Project = require('../models/project');
const Customer = require('../models/customer');
const pubsub = require('../services/pubsub');

const customerMutations = {
  participate: async (root, args) => {
    let project = await Project.findById(args.projectId);
    const customer = new Customer({
      name: args.name,
      email: args.email,
      phone: args.phone || '',
      projects: args.projects || [],
      company: args.company || '',
      information: args.information || ''
    });

    project.participants = project.participants.concat(customer._id);

    await customer.save().catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });

    await project.save().catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });

    pubsub.publish('NEW_PARTICIPANT', {
      newParticipation: customer
    });
    return customer;
  },
  createCustomer: async (root, args) => {
    const customer = new Customer({
      name: args.name,
      email: args.email,
      phone: args.phone || '',
      projects: args.projects || [],
      company: args.company || '',
      information: args.information || ''
    });
    await customer.save().catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });
    pubsub.publish('CUSTOMER_ADDED', {
      customerAdded: customer
    });
    return customer;
  },
  updateCustomer: async (root, args) => {
    const customer = await Customer.findById(args.id);
    const updatedCustomer = {
      name: args.name || customer.name || '',
      email: args.email || customer.email || '',
      phone: args.phone || customer.phone || '',
      company: args.company || customer.company || '',
      information: customer.information || '',
      projects: customer.projects || [],
      id: customer._id,
      __v: customer.__v
    };
    await customer.updateOne(updatedCustomer).catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });
    pubsub.publish('CUSTOMER_UPDATED', {
      customerUpdated: updatedCustomer
    });
    return updatedCustomer;
  },
  removeCustomer: async (root, args) => {
    const customer = await Customer.findByIdAndRemove(args.id).catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args
      });
    });
    pubsub.publish('CUSTOMER_DELETED', {
      customerDeleted: customer
    });
    return customer;
  }
};

module.exports = customerMutations;
