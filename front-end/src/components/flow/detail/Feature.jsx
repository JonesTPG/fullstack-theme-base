import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  media: {
    paddingTop: '50%'
  },

  link: {
    textDecoration: 'none',
    '&:hover,&:focus': {
      textDecoration: 'none'
    }
  }
}));

const Feature = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={'img/' + data.img} />
        <CardHeader subheader={data.subtitle} />
      </Card>
    </div>
  );
};

export default Feature;
