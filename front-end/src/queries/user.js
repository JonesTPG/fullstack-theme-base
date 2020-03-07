import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
  query {
    user {
      username
      firstName
      lastName
      roles
      darkTheme
      id
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
      id
    }
  }
`;
export const USER_UPDATED = gql`
  subscription {
    userUpdated {
      username
      firstName
      lastName
      roles
      darkTheme
      id
    }
  }
`;
export const USER_DELETED = gql`
  subscription {
    userDeleted {
      username
      firstName
      lastName
      roles
      darkTheme
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $firstName: String
    $lastName: String
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

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $firstName: String
    $lastName: String
    $password: String
  ) {
    updateUser(
      id: $id
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

export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      username
      firstName
      lastName
      roles
      darkTheme
      id
    }
  }
`;
