import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TechCard from './TechCard';
import FeatureCard from './FeatureCard';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { frontPage } from './pagedata';

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

const PageInfo = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1> Full Stack Theme Base</h1>
              <p>A ready-to-use full stack web application template.</p>
              <h3>Technologies used:</h3>
            </Paper>
          </Grid>

          {frontPage.techcards.map(data => (
            <Grid key={data.title} item xs={12} sm={6} md={3}>
              <TechCard data={data}></TechCard>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1> Features </h1>
              <p>
                The application comes with some built-in example features,
                here's a look at the most important features.
              </p>
            </Paper>
          </Grid>
          {frontPage.featureCards.map(data => (
            <Grid key={data.title} item xs={12} sm={6} md={3}>
              <FeatureCard data={data}></FeatureCard>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1> Interested to hear more? </h1>
              <Link to="/feedback">
                <Button variant="contained" color="primary">
                  Give feedback
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="contained" color="primary">
                  Contact us
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PageInfo;
