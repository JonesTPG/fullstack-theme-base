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
    // height: '50%',
    // width: '50%',
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

const ProjectCard = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardHeader title={data.title} subheader={data.subtitle} />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {data.shortDesc}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCard;
