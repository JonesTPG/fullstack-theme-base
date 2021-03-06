import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      roles
      darkTheme
    }
  }
`;

export const ME = gql`
  {
    me {
      username
      roles
      darkTheme
    }
  }
`;
