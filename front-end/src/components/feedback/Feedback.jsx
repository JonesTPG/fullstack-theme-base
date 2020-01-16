import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import FeedbackForm from "./FeedbackForm"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    width: 400,
    height: 100,
  },
}));

export default function Feedback() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <FeedbackForm />
      </Paper>
    </Container>
  );
}