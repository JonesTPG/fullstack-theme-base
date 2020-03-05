import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';

import { frontPage } from './home-page-data';
import Hero from './Hero';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  }
}));

const HomePage = props => {
  const classes = useStyles();

  return (
    <>
      <Hero />
    </>
  );
};

export default withRouter(HomePage);
