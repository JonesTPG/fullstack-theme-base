import React, { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { FEEDBACK_ADDED, GET_ALL_FEEDBACKS } from '../../../queries/feedback';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FeedbackChart from './FeedbackChart';
import CustomSnackbar from '../../notifications/CustomSnackbar';
import useNotification from '../../../hooks/notification';

const styles = theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2)
  }
});

const FeedbackFeed = props => {
  const [feedbackList, setFeedbackList] = useState([]);
  const { classes } = props;
  const notification = useNotification();

  const { loading } = useQuery(GET_ALL_FEEDBACKS, {
    onCompleted: data => {
      setFeedbackList(data.feedback);
    },
    onError: error => {
      console.log(error);
      notification.showNotification('Error in fetching data', 'error');
    }
  });

  useSubscription(FEEDBACK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Feedback subscription ', subscriptionData);
      const newItem = subscriptionData.data.feedbackAdded;
      setFeedbackList([...feedbackList, newItem]);
      notification.showNotification('Someone gave feedback!', 'success');
    }
  });

  if (loading) {
    return (
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <FeedbackChart
              feedbackGrades={feedbackList.map(item => item.appGrade)}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <FeedbackChart
              feedbackGrades={feedbackList.map(item => item.uiGrade)}
            />
          </Grid>
        </Paper>
      </Grid>
      {feedbackList.map((item, index) => {
        if (item.textFeedback === '') {
          return null;
        }
        return (
          <Grid item key={index}>
            <Typography>&quot;{item.textFeedback}&quot;</Typography>
          </Grid>
        );
      })}
      <CustomSnackbar {...notification.notificationProps()} />
    </Grid>
  );
};

export default withStyles(styles)(FeedbackFeed);
