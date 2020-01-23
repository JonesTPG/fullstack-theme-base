import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Route, withRouter, Switch } from 'react-router-dom';
import { ME } from '../../queries/login';
import { useQuery } from 'react-apollo';

import { adminPage } from './pagedata';
import FeatureCard from '../main/page-info/FeatureCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  }
}));

const AdminContent = props => {
  const classes = useStyles();
  const { data, loading } = useQuery(ME);

  if (loading) {
    return <p>loading</p>;
  } else if (
    data.me === undefined ||
    data.me === null ||
    !data.me.roles.includes('ADMIN')
  ) {
    return <p>you do not have permissions to access this page</p>;
  } else {
    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1> Full Stack Theme Base Admin View</h1>

                <h3>
                  Here the site admins are able to view real-time data about the
                  state of the application.
                </h3>
              </Paper>
            </Grid>

            {adminPage.featureCards.map(data => (
              <Grid key={data.title} item xs={12} sm={12} md={6} lg={3}>
                <FeatureCard data={data}></FeatureCard>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1> Interested to hear more? </h1>
                <Button
                  variant="contained"
                  onClick={() => props.history.push('/feedback')}
                  color="primary"
                >
                  Give feedback
                </Button>{' '}
                <Button
                  variant="contained"
                  onClick={() => props.history.push('/contact-us')}
                  color="primary"
                >
                  Contact us
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
};

const routedAdminContent = withRouter(AdminContent);
export default routedAdminContent;
