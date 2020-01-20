import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { FeedbackStyles } from '../AllStyles';
import { withStyles, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SentimentDissatisfiedRounded from '@material-ui/icons/SentimentDissatisfiedRounded';
import SentimentSatisfiedRounded from '@material-ui/icons/SentimentSatisfiedRounded';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';

const Feedback = props => {
  const { classes } = props;

  const handleSadClick = event => {
    event.preventDefault();
    console.log('Sad');
  };
  const handleOkClick = event => {
    event.preventDefault();
    console.log('OK');
  };
  const handleGladClick = event => {
    event.preventDefault();
    console.log('Happy');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <h2>Please let us know how you feel</h2>
        </Grid>
        <Divider variant="middle"></Divider>
        <Grid item>
          <IconButton className={classes.iconbutton} onClick={handleSadClick}>
            <SentimentDissatisfiedRounded />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconbutton} onClick={handleOkClick}>
            <SentimentSatisfied />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconbutton} onClick={handleGladClick}>
            <SentimentSatisfiedRounded />
          </IconButton>
        </Grid>
        <Divider variant="middle"></Divider>
        <Grid item>
          <TextField
            id="filled-textarea"
            label="Feedback"
            placeholder="Write feedback..."
            multiline
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(FeedbackStyles)(Feedback);
