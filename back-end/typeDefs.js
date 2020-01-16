const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    roles: [String]
    id: ID!
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
    createUser(username: String!): User
    createAdminUser(username: String!): User
    createFeedback(type: Int!): Feedback
    deleteUsers: Boolean!
    login(username: String!, password: String!): UserData
  }

  type Subscription {
    userAdded: User!
    feedbackAdded: Feedback!
  }
`;

module.exports = typeDefs;
