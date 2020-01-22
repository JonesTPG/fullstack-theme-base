import { gql } from 'apollo-boost';

export const CHANGE_THEME = gql`
  mutation {
    changeTheme
  }
`;

export const GET_LOCAL_THEME = gql`
  {
    darkTheme @client
  }
`;
