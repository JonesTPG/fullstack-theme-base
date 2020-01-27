/* eslint-disable indent */
import React from 'react';
import clsx from 'clsx';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import Brightness from '@material-ui/icons/Brightness4';

import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CHANGE_THEME, GET_LOCAL_THEME } from '../../queries/theme';

import { Switch, Route, withRouter } from 'react-router-dom';

import { logOut } from '../../services/authService';
import Feedback from '../feedback/Feedback';

import { ME } from '../../queries/login';
import { useQuery } from '@apollo/react-hooks';
import { useToken } from '../../hooks/auth';
import PageInfo from './page-info/PageInfo';
import ContactForm from '../contact/ContactForm';
import MainStyles from './MainStyles';

const Main = ({ classes, ...props }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const client = useApolloClient();
  const [changeTheme] = useMutation(CHANGE_THEME, {
    onCompleted() {},
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

  const token = useToken();
  const { data } = useQuery(ME);

  console.log(data);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeChange = async () => {
    await changeTheme();
  };

  const handleAuthClick = () => {
    client.resetStore();
    logOut();
    props.history.push('/login');
  };

  const handleAdminClick = () => {
    props.history.push('/admin');
  };

  const Content = () => {
    return (
      <Switch>
        <Route path="/feedback" render={() => <Feedback />} />
        <Route path="/contact-us" render={() => <ContactForm />} />
        <Route path="/" render={() => <PageInfo />} />
      </Switch>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {data === undefined || data.me === null
              ? 'Welcome'
              : 'Welcome ' + data.me.username + '!'}
          </Typography>
          {data !== undefined &&
            data.me !== null &&
            data.me.roles.includes('ADMIN') && (
              <Button
                data-cy="adminview"
                onClick={handleAdminClick}
                color="inherit"
              >
                Go to admin view
              </Button>
            )}

          <IconButton onClick={handleThemeChange} color="inherit">
            <Brightness />
          </IconButton>
          <Button data-cy="logout" onClick={handleAuthClick} color="inherit">
            {token ? 'Log Out' : 'Log In'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerClose}
            className={classes.chevronLeftButton}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List disablePadding className={classes.list}>
          <ListItem button onClick={() => props.history.push('/')}>
            <ListItemIcon>
              <HomeIcon className={classes.sidenavIcon} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => props.history.push('/feedback')}>
            <ListItemIcon>
              <MailIcon className={classes.sidenavIcon} />
            </ListItemIcon>
            <ListItemText primary="Give Feedback" />
          </ListItem>
          <ListItem button onClick={() => props.history.push('/contact-us')}>
            <ListItemIcon>
              <InboxIcon className={classes.sidenavIcon} />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleAuthClick}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.sidenavIcon} />
            </ListItemIcon>

            <ListItemText primary={token ? 'Log Out' : 'Log In'} />
          </ListItem>
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {Content()}
      </main>
    </div>
  );
};

const styledMain = withStyles(MainStyles)(Main);
export default withRouter(styledMain);
