import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: { height: '300px' },
  media: {
    paddingTop: '50%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const ProjectCard = ({ project }) => {
  const classes = useStyles();
  console.log(project);
  return (
    <>
      <p>testi</p>
      <Card className={classes.card}>
        <CardHeader title={project.name} subheader={project.description} />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {project.price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCard;
