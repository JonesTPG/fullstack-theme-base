import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    user {
      username
      firstName
      lastName
      roles
      darkTheme
    }
  }
`;

export const USER_ADDED = gql`
  subscription {
    userAdded {
      username
      firstName
      lastName
      roles
      darkTheme
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      username
      firstName
      lastName
      roles
      darkTheme
      id
    }
  }
`;
