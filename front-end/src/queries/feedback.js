import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    feedback {
      type
      user {
        username
      }
    }
  }
`;

export const FEEDBACK_ADDED = gql`
  subscription {
    feedbackAdded {
      type
      user {
        username
      }
    }
  }
`;
