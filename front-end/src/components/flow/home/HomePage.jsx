import React from 'react';
import { Helmet } from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { withRouter } from 'react-router-dom';

import Hero from './Hero';
import ProjectCard from './ProjectCard';
import DataStepper from '../stepper/DataStepper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    width: '450px',
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  },
  stepper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  },
  projects: {}
}));

const HomePage = ({ projects }) => {
  const classes = useStyles();
  const [isStepperShown, setIsStepperShown] = React.useState(true);
  const [stepperData, setStepperData] = React.useState(null);

  const isEmpty = obj => {
    for (const prop in obj) {
      return false;
    }
    return true;
  };

  const handleSubmit = data => {
    setStepperData(isEmpty(data) ? null : data);
    console.log(data);
    setIsStepperShown(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FlowIT - Home Page</title>
      </Helmet>
      <Hero />
      <div className={classes.root}>
        <Grid justify="center" container>
          {isStepperShown ? (
            <Grid item xs={12} md={10} lg={8}>
              <Paper className={classes.stepper}>
                <DataStepper handleSubmit={handleSubmit} />
              </Paper>
            </Grid>
          ) : (
            projects.map(project => (
              <Paper key={project.id} className={classes.paper}>
                <ProjectCard project={project} />
              </Paper>
            ))
          )}
        </Grid>
      </div>
    </>
  );
};

export default withRouter(HomePage);
