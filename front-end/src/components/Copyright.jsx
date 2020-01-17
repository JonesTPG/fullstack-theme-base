import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { CopyrightStyles } from './AllStyles';
import { withStyles } from '@material-ui/core/styles';

const Copyright = ({ classes }) => {
  return (
    <Typography variant="body2" className={classes.typography} align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        you guessed it
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default withStyles(CopyrightStyles)(Copyright);
