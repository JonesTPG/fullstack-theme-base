import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
  }
}));

const ProjectCard = ({ project, history }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {project.name}
            </Typography>
            <img
              width="200"
              className={classes.img}
              alt="complex"
              src="/img/deal.jpg"
            />
            <Typography variant="body2" gutterBottom>
              {project.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {project.id}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Starting Price: {project.price} €
            </Typography>
            <Typography variant="subtitle1">
              Current Price: {project.currentPrice} €
            </Typography>
            <Button
              onClick={() => history.push('/flow/' + project.id)}
              variant="contained"
              color="primary"
            >
              Lisätietoja
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(ProjectCard);
