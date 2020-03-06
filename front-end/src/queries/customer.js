import { gql } from 'apollo-boost';

export const GET_ALL_CUSTOMERS = gql`
  query {
    customer {
      name
      email
      phone
      projects {
        name
        id
      }
      company
      information
      id
    }
  }
`;

export const CUSTOMER_SUBSCRIPTION = gql`
  subscription {
    customerAdded {
      name
      email
      phone
      projects {
        name
      }
      company
      information
      id
    }
    customerUpdated {
      name
      email
      phone
      projects {
        name
      }
      company
      information
      id
    }
    customerDeleted {
      name
      email
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $name: String!
    $email: String!
    $phone: String
    $company: String
    $information: String
  ) {
    createCustomer(
      name: $name
      email: $email
      phone: $phone
      company: $company
      information: $information
    ) {
      name
      email
      phone
      company
      information
      id
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $company: String
    $information: String
  ) {
    updateCustomer(
      id: $id
      name: $name
      email: $email
      phone: $phone
      company: $company
      information: $information
    ) {
      name
      email
      phone
      company
      information
      id
    }
  }
`;

export const REMOVE_CUSTOMER = gql`
  mutation removeCustomer($id: ID!) {
    removeCustomer(id: $id) {
      name
      email
      id
    }
  }
`;
