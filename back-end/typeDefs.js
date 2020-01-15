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

  type Query {
    me: User
    hello: String
  }

  type Mutation {
    createUser(username: String!): User
    createAdminUser(username: String!): User
    deleteUsers: Boolean!
    login(username: String!, password: String!): UserData
  }

  type Subscription {
    userAdded: User!
  }
`;

module.exports = typeDefs;
