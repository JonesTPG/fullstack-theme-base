import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddRounded from '@material-ui/icons/AddRounded';
import RemoveRounded from '@material-ui/icons/RemoveRounded';
import Grid from '@material-ui/core/Grid';
import Main from '../main/Main';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3)
  },
  iconbutton: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    '&:hover,&:focus': {
      backgroundColor: theme.palette.secondary.light
    },
    color: theme.palette.secondary.contrastText
  }
}));

const Counter = () => {
  const [count, setCount] = useState(0);

  const classes = useStyles();

  return (
    <Main pageName="Counter">
      <div className={classes.paper}>
        {count}
        <Grid container spacing={2}>
          <Grid item>
            <IconButton
              onClick={() => setCount(count + 1)}
              className={classes.iconbutton}
            >
              <AddRounded />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => setCount(count - 1)}
              className={classes.iconbutton}
            >
              <RemoveRounded />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Main>
  );
};

export default Counter;
