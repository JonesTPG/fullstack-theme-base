import { gql } from 'apollo-boost';

export const GET_ALL_RESTAURANTS = gql`
  query {
    restaurant {
      name
      blurhash
      city
      currency
      delivery_price
      description
      image
      location
      online
      tags
    }
  }
`;
