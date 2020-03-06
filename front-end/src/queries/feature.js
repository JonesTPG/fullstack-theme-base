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
