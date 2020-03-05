import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './side-nav/Navigator';
import Header from './header/Header';
import AdminContent from './AdminContent';
import { Route, Switch } from 'react-router-dom';
import FeedbackView from './feed/FeedbackView';
import ThemeChangeFeed from './feed/ThemeChangeFeed';
import ContactFeed from './feed/ContactFeed';
import UserView from './feed/UserView';

const drawerWidth = 256;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    backgroundColor: theme.palette.primary.paper
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: theme.palette.background.default
  },
  footer: {
    padding: theme.spacing(2)
  }
});

const Admin = props => {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Content = () => {
    return (
      <>
        <Switch>
          <Route path="/admin/feed/feedback" render={() => <FeedbackView />} />
          <Route path="/admin/feed/contact-us" render={() => <ContactFeed />} />
          <Route
            path="/admin/feed/theme-change"
            render={() => <ThemeChangeFeed />}
          />
          <Route path="/admin/feed/user-creation" render={() => <UserView />} />
          <Route path="/admin" render={() => <AdminContent />} />
        </Switch>
      </>
    );
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>{Content()}</main>
        </div>
      </div>
    </>
  );
};

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admin);
