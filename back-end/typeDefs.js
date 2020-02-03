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
    type: Int!
    user: User
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

  type Query {
    me: User
    hello: String
    feedback: [Feedback]
    contact: [Contact]
  }

  type Mutation {
    createUser(
      username: String!
      firstName: String
      lastName: String
      password: String!
    ): User
    createAdminUser(username: String!): User
    createFeedback(type: Int!): Feedback
    resetDatabase: Boolean!
    login(username: String!, password: String!): UserData
    changeTheme: Boolean!
    createContact(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      company: String
      message: String
    ): Contact
  }

  type Subscription {
    userAdded: User!
    feedbackAdded: Feedback!
    userLoggedIn: User!
    userChangedTheme: User!
    contactAdded: Contact!
  }
`;

module.exports = typeDefs;
