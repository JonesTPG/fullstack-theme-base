import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TechCard from './TechCard';
import FeatureCard from './FeatureCard';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router-dom';

import { frontPage } from './pagedata';
import Team from './team/Team';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  heading: {
    textAlign: 'center'
  }
}));

const PageInfo = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1> Full Stack Theme Base</h1>
              <p>A ready-to-use full stack web application template.</p>
              <p>
                Built as a part of Full Stack Open 2019 course and LUTes Forward
                start-up competition.
              </p>
              <Team />
            </Paper>
            <br />
            <Typography className={classes.heading} variant="h5">
              Technologies used:
            </Typography>
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
                here&apos;s a look at the most important features.
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
              <Button
                variant="contained"
                onClick={() => props.history.push('/feedback')}
                color="secondary"
              >
                Give feedback
              </Button>{' '}
              <Button
                variant="contained"
                onClick={() => props.history.push('/contact-us')}
                color="secondary"
              >
                Contact us
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withRouter(PageInfo);
