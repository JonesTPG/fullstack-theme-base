import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    contact {
      firstName
      lastName
      email
      phone
      company
      message
      user {
        username
      }
    }
  }
`;

export const CONTACT_ADDED = gql`
  subscription {
    contactAdded {
      firstName
      lastName
      email
      phone
      company
      message
      user {
        username
      }
    }
  }
`;
