import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { FeedbackStyles } from '../AllStyles';
import { withStyles } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SentimentDissatisfiedRounded from '@material-ui/icons/SentimentDissatisfiedRounded';
import SentimentSatisfiedRounded from '@material-ui/icons/SentimentSatisfiedRounded';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import useField from "../../hooks/input";

const Feedback = props => {
  const textFeedback = useField("text")
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
  const handleFeedback = event => {
    event.preventDefault()
    console.log("Feedback", textFeedback.value)
    // sendFeedback(textFeedback.value)
    textFeedback.resetState()
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <h2>Please let us know how you feel</h2>
        </Grid>
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
        <Grid item>
          <TextField
            id="filled-textarea"
            label="Feedback"
            placeholder="Write feedback..."
            multiline
            variant="outlined"
            {...textFeedback.inputprops()}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleFeedback} className={classes.submit} >Send</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(FeedbackStyles)(Feedback);
