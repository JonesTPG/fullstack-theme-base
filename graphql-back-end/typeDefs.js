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
  }

  type Feedback {
    type: Int!
    user: User!
  }

  type Query {
    me: User
    hello: String
    feedback: [Feedback]
  }

  type Mutation {
    createUser(
      username: String!
      firstName: String
      lastName: String
      password: String
    ): User
    createAdminUser(username: String!): User
    createFeedback(type: Int!): Feedback
    deleteUsers: Boolean!
    login(username: String!, password: String!): UserData
    changeTheme: Boolean!
  }

  type Subscription {
    userAdded: User!
    feedbackAdded: Feedback!
    userLoggedIn: User!
    userChangedTheme: User!
  }
`;

module.exports = typeDefs;
