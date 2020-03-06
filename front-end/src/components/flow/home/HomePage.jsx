import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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
  content: {
    display: 'none'
  }
}));

const HomePage = ({ projects }) => {
  const classes = useStyles();
  console.log(projects);
  return (
    <>
      <Hero />
      {projects.map(project => (
        <ProjectCard key={project.id} project={project}></ProjectCard>
      ))}
    </>
  );
};

export default withRouter(HomePage);
