import React, { useState } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, FEEDBACK_ADDED } from '../../../queries/feedback';
import Feedback from './Feedback';
import Grid from '@material-ui/core/Grid';

const FeedbackFeed = () => {
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
      <Grid container justify="center" spacing={2}>
        {feedbackList.reverse().map((item, index) => (
          <Grid item key={index} xs={8} sm={8} md={8}>
            <Feedback key={index} data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FeedbackFeed;
