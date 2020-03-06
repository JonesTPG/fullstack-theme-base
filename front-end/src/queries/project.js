import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    project {
      name
      description
      features {
        name
        description
        imgUrl
        id
      }
      price
      participants
      endTime
      id
    }
  }
`;

export const PROJECT_ADDED = gql`
  subscription {
    projectAdded {
      name
      description
      features
      price
      participants
      endTime
      id
    }
  }
`;
