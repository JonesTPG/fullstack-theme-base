import { gql } from 'apollo-boost';

export const GET_ALL_PROJECTS = gql`
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
      participants {
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

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $features: [Feature]!
    $price: Int!
    $endTime: Int!
  ) {
    createProject(
      name: $name
      description: $description
      features: $features
      price: $price
      endTime: $endTime
    ) {
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
