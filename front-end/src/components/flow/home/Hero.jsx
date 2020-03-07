import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  heroImage: {
    width: '100%',
    backgroundImage: 'url("img/banner.png")',
    height: 'auto'
  }
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <>
      <img
        src="img/banner.png"
        className={classes.heroImage}
        alt="FlowIT banner"
      ></img>
    </>
  );
};

export default Hero;
