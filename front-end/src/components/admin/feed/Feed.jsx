import React, { useState } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, FEEDBACK_ADDED } from '../../../queries/feedback';
import Feedback from './feedback/Feedback';
import UserSearch from '../usersearch/UserSearch';

const Feed = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useQuery(GET_ALL, {
    onCompleted: data => {
      if (data.feedback) {
        setFeedbackList(data.feedback);
      }
    },
    onError: error => {
      console.log(error);
    }
  });

  useSubscription(FEEDBACK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newItem = subscriptionData.data.feedbackAdded;
      setFeedbackList(feedbackList.concat(newItem));
    }
  });

  return (
    <>
      <UserSearch></UserSearch>
      {feedbackList.reverse().map((item, index) => (
        <Feedback key={index} data={item}></Feedback>
      ))}
    </>
  );
};

export default Feed;
