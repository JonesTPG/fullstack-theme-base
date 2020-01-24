import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks';
import { CHANGE_THEME, GET_LOCAL_THEME } from '../../../queries/theme';

import { ME } from '../../../queries/login';

import { styles } from './HeaderStyles';
import { logOut } from '../../../services/authService';

const Header = props => {
  const { classes, onDrawerToggle } = props;

  const client = useApolloClient();
  const [changeTheme] = useMutation(CHANGE_THEME, {
    onCompleted() {
      console.log('theme changed');
    },
    onError(error) {
      console.log(error);
    },

    update: cache => {
      const data = cache.readQuery({
        query: GET_LOCAL_THEME
      });
      const dataCopy = { ...data, darkTheme: !data.darkTheme };
      cache.writeQuery({
        query: GET_LOCAL_THEME,
        data: dataCopy
      });
    }
  });

  const { loading, data } = useQuery(ME);

  const handleSignOut = () => {
    logOut();
    client.resetStore();
    props.history.push('/login');
  };

  const handleThemeChange = async () => {
    await changeTheme();
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link to="/" className={classes.link}>
                <Button className={classes.button} color="inherit" size="small">
                  Go to user screen
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {!loading && data !== undefined && data.me !== null
                  ? 'Welcome ' + data.me.username
                  : 'Welcome'}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSignOut}
                className={classes.button}
                color="inherit"
                size="small"
              >
                Sign Out
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="change the color scheme of the application">
                <Button
                  onClick={handleThemeChange}
                  className={classes.button}
                  color="inherit"
                  size="small"
                >
                  Change theme
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

const styledHeader = withStyles(styles)(Header);
export default withRouter(styledHeader);
