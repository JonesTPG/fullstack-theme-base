import { gql } from 'apollo-boost';

export const GET_ALL_FEEDBACKS = gql`
  query {
    feedback {
      appGrade
      uiGrade
      textFeedback
    }
  }
`;

export const CREATE_FEEDBACK = gql`
  mutation createFeedback(
    $appGrade: Int!
    $textFeedback: String
    $uiGrade: Int!
  ) {
    createFeedback(
      appGrade: $appGrade
      textFeedback: $textFeedback
      uiGrade: $uiGrade
    ) {
      appGrade
      uiGrade
      textFeedback
    }
  }
`;

export const FEEDBACK_ADDED = gql`
  subscription {
    feedbackAdded {
      appGrade
      uiGrade
      textFeedback
    }
  }
`;
