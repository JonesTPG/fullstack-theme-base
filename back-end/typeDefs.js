const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    roles: [String]
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    hello: String
  }

  type Mutation {
    createUser(username: String!): User
    createAdminUser(username: String!): User
    deleteUsers: Boolean!
    login(username: String!, password: String!): Token
  }

  type Subscription {
    userAdded: User!
  }
`;

module.exports = typeDefs;
