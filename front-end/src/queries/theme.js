import { gql } from 'apollo-boost';

export const CHANGE_THEME = gql`
  mutation {
    changeTheme
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
