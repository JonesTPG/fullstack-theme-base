import { gql } from 'apollo-boost';

export const SIGNUP = gql`
  mutation createUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      username
    }
  }
`;
