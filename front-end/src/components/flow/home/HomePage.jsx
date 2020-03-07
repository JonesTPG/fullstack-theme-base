import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { withRouter } from 'react-router-dom';

import Hero from './Hero';
import ProjectCard from './ProjectCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
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

      <div className={classes.projects}>
        {projects.map(project => (
          <Grid key={project.id} item xs={12} sm={6} md={3}>
            <ProjectCard project={project}></ProjectCard>
          </Grid>
        ))}
      </div>
    </>
  );
};

export default withRouter(HomePage);
