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

export const CUSTOMER_ADDED = gql`
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
    }
  }
`;
