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
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  projects: {
    padding: theme.spacing(3)
  }
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
    setIsStepperShown(false);
  };

  const applyDataFilters = () => {
    if (!isStepperShown && stepperData) {
      console.log('Do some filtering', stepperData);
    }
    return projects;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FlowIT - Home Page</title>
      </Helmet>
      <Hero />
      <div className={classes.root}>
        <Grid container justify="center" spacing={2}>
          {isStepperShown ? (
            <Grid item xs={12} md={10} lg={8}>
              <Paper className={classes.paper}>
                <DataStepper handleSubmit={handleSubmit} />
              </Paper>
            </Grid>
          ) : (
            applyDataFilters().map(project => (
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
