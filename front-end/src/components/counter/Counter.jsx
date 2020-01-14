import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper"
import AddRounded from "@material-ui/icons/AddRounded";
import RemoveRounded from "@material-ui/icons/RemoveRounded";
import Main from "../main/Main";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    width: 200,
    height: 200,
  },
}));

const Counter = () => {
  const [count, setCount] = useState(0)
    
  const classes = useStyles();

  return (
    <Main pageName="Counter" >
      <Paper className={classes.paper}>
        {count}
        <IconButton onClick={() => setCount(count + 1)} color="inherit">
            <AddRounded />
        </IconButton>
        <IconButton onClick={() => setCount(count - 1)} color="inherit">
            <RemoveRounded />
        </IconButton>
      </Paper>
    </Main>
  )
}

export default Counter