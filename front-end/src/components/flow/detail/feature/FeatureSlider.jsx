import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Feature from './Feature';

import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { frontPage } from './featuredata';
import CommitForm from '../participation/CommitForm';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: '25px'
  },
  card: {
    padding: '5px',
    paddingTop: '15px'
  },
  content: {
    padding: theme.spacing(3)
  }
}));

const FeatureSlider = () => {
  let settings = {
    infinite: true,
    speed: 1000,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 2,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Ominaisuudet</Paper>
        </Grid>
        <Slider {...settings}>
          {frontPage.techcards.map(data => (
            <Grid key={data.title} className={classes.card}>
              <Feature data={data}></Feature>
            </Grid>
          ))}
        </Slider>
      </div>
      <br /> <br />
      <CommitForm />
    </div>
  );
};

export default withRouter(FeatureSlider);
