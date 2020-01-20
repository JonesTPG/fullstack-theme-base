import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MenuRounded from '@material-ui/icons/MenuRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { withRouter } from 'react-router-dom';
import { MainStyles } from '../AllStyles';
import { withStyles } from '@material-ui/core/styles';

import { logOut } from '../../services/authService';

const Main = props => {
  const { classes } = props;

  const handleThemeChange = () => {
    console.log('theme page');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
          >
            <MenuRounded />
          </IconButton>
          <IconButton onClick={() => props.history.push('/')} color="inherit">
            <HomeRounded />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {props.pageName}
          </Typography>
          <IconButton
            onClick={() => props.history.push('/login')}
            color="inherit"
          >
            <Badge badgeContent={10} color="secondary">
              <AccountCircleRounded />
            </Badge>
          </IconButton>
          <IconButton onClick={handleThemeChange} color="inherit">
            <ColorLensIcon />
          </IconButton>
          <IconButton data-cy="logout" onClick={logOut} color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <IconButton
            onClick={() => props.history.push('/counter')}
            color="inherit"
          >
            <AddCircleOutlineRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            {props.children}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const styledMain = withStyles(MainStyles)(Main);
export default withRouter(styledMain);
