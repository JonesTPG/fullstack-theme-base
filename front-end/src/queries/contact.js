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

export const CREATE_CONTACT = gql`
  mutation createContact(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String
    $company: String
    $message: String
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      company: $company
      message: $message
    ) {
      firstName
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
