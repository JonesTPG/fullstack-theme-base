import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

import Hero from './Hero';
import ShowCase from './Showcase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  content: {
    display: 'none'
  }
}));

const HomePage = props => {
  const classes = useStyles();

  return (
    <>
      <Hero />
      <ShowCase />
    </>
  );
};

export default withRouter(HomePage);