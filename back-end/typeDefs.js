const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    username: String!
    roles: [String]
    darkTheme: Boolean
    id: ID!
    firstName: String
    lastName: String
  }

  type UserData {
    value: String!
    roles: [String]!
    darkTheme: Boolean!
  }

  type Feedback {
    uiGrade: Int!
    appGrade: Int!
    textFeedback: String
  }

  type Contact {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    company: String
    message: String
    user: User
  }

  type Project {
    name: String!
    description: String!
    features: [Feature]!
    price: String
    currentPrice: String
    participants: [Customer]!
    endTime: Int!
    id: ID!
  }

  type Customer {
    name: String
    email: String
    phone: String
    projects: [Project]
    company: String
    information: String
    id: ID!
  }

  type Feature {
    name: String!
    description: String!
    imgUrl: String!
    id: ID!
  }

  type Restaurant {
    id: ID
    name: String
    blurhash: String
    city: String
    currency: String
    delivery_price: Int
    description: String
    image: String
    location: [String]
    online: Boolean
    tags: [String]
  }

  type Query {
    me: User
    hello: String
    feedback: [Feedback]
    contact: [Contact]
    project: [Project]
    feature: [Feature]
    user: [User]
    customer: [Customer]
    restaurant: [Restaurant]
  }

  type Mutation {
    createUser(
      username: String!
      firstName: String
      lastName: String
      password: String!
    ): User
    updateUser(
      id: ID!
      username: String
      firstName: String
      lastName: String
      password: String
      darkTheme: Boolean
      roles: [String]
    ): User
    removeUser(id: ID!): User
    createAdminUser(username: String!): User
    createFeedback(
      uiGrade: Int!
      appGrade: Int!
      textFeedback: String
    ): Feedback
    resetDatabase: Boolean!
    login(username: String!, password: String!): UserData
    changeTheme: Boolean
    createContact(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      company: String
      message: String
    ): Contact
    createProject(
      name: String!
      description: String!
      features: [String]!
      price: Int!
      endTime: Int!
    ): Project
    createCustomer(
      name: String!
      email: String!
      phone: String
      projects: [ID]
      company: String
      information: String
    ): Customer
    updateCustomer(
      id: ID!
      name: String
      email: String
      phone: String
      projects: [ID]
      company: String
      information: String
    ): Customer
    removeCustomer(id: ID!): Customer
    createFeature(name: String!, description: String!, imgUrl: String!): Feature
    participate(
      projectId: String!
      name: String!
      email: String!
      phone: String!
      company: String
      information: String
    ): Customer
  }

  type Subscription {
    userAdded: User!
    userUpdated: User!
    userDeleted: User!
    feedbackAdded: Feedback!
    userLoggedIn: User!
    userChangedTheme: User
    contactAdded: Contact!
    projectAdded: Project!
    featureAdded: Feature!
    customerAdded: Customer!
    customerUpdated: Customer!
    customerDeleted: Customer!
    newParticipation: Customer!
  }
`;

module.exports = typeDefs;
