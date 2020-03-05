import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  heroImage: {
    height: '400px',
    backgroundImage: 'url("banner.png")',
    height: '50%'
  },
  heroText: { textAlign: 'center' }
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroImage}>
        <div className={classes.heroText}>
          {/* <h1>I am John Doe</h1>
        <p>And I'm a Photographer</p> */}
          <button>See the best deals</button>
        </div>
      </div>
      <p> test </p>
    </>
  );
};

export default Hero;
