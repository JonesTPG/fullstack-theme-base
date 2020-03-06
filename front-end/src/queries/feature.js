import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    feature {
      name
      description
      imgUrl
      id
    }
  }
`;

export const FEATURE_ADDED = gql`
  subscription {
    featureAdded {
      name
      description
      imgUrl
      id
    }
  }
`;

export const CREATE_FEATURE = gql`
  mutation createFeature(
    $name: String!
    $description: String!
    $imgUrl: String!
  ) {
    createFeature(name: $name, description: $description, imgUrl: $imgUrl) {
      name
      description
      imgUrl
      id
    }
  }
`;
