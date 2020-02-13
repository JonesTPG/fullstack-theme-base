import React, { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, FEEDBACK_ADDED } from '../../../queries/feedback';
import { withStyles } from '@material-ui/core/styles';
import Feedback from './Feedback';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import FeedbackChart from './FeedbackChart';

const styles = theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2)
  }
});

const FeedbackFeed = props => {
  const [feedbackList, setFeedbackList] = useState([]);

  const { classes } = props;

  const { loading } = useQuery(GET_ALL, {
    onCompleted: data => {
      if (data.feedback) {
        let feedbackData = data.feedback;
        setFeedbackList(feedbackData);
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

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Grid container justify="center" spacing={2}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <FeedbackChart data={feedbackList} />
        </Grid>
      </Paper>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {feedbackList
          .splice()
          .reverse()
          .map((item, index) => (
            <Grid item key={index} xs={8}>
              <Feedback data={item} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FeedbackFeed);
