import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
  }
}));

const TeamMember = ({ member }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {member.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {member.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {member.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TeamMember;
