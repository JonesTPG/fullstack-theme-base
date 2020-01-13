const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
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

    login(username: String!, password: String!): Token
  }

  type Subscription {
    userAdded: User!
  }
`;

module.exports = typeDefs;
