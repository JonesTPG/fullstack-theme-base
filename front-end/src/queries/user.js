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
