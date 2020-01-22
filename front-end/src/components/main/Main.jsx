import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

import Brightness from '@material-ui/icons/Brightness4';

import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CHANGE_THEME, GET_LOCAL_THEME } from '../../queries/theme';

import { withRouter } from 'react-router-dom';

import { logOut } from '../../services/authService';
import Feedback from '../feedback/Feedback';

import { ME } from '../../queries/login';
import { useQuery } from '@apollo/react-hooks';
import { useToken } from '../../hooks/auth';
import PageInfo from './page-info/PageInfo';
import { Route, Switch } from 'react-router-dom';
import ContactForm from '../contact/ContactForm';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  chevronLeftButton: {
    color: '#FFFFFF'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default
  },
  drawerHeader: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  },
  title: {
    flexGrow: 1
  }
}));

const Main = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
      console.log(data);
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

  const handleAuthClick = event => {
    token == undefined ? props.history.push('/login') : client.resetStore();
    logOut();
    props.history.push('/login');
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
          <IconButton onClick={handleThemeChange} color="inherit">
            <Brightness />
          </IconButton>
          <Button data-cy="logout" onClick={handleAuthClick} color="inherit">
            {token == undefined ? 'Login' : 'Logout'}
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
        <List>
          <ListItem button onClick={() => props.history.push('/')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => props.history.push('/contact-us')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleAuthClick}>
            <ListItemIcon>
              <ExitToAppIcon></ExitToAppIcon>
            </ListItemIcon>
            <ListItemText primary={token == undefined ? 'Log In' : 'Log Out'} />
          </ListItem>
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {/* {token ? Content() : <p>you are not logged in</p>} */}
        {Content()}
      </main>
    </div>
  );
};

const routedMain = withRouter(Main);
export default routedMain;
