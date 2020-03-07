import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { withRouter } from 'react-router-dom';

import Hero from './Hero';
import ProjectCard from './ProjectCard';

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
  console.log(projects);
  return (
    <>
      <Hero />

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project}></ProjectCard>
            ))}
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default withRouter(HomePage);
