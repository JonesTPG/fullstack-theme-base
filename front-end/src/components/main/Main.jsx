import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import MenuRounded from "@material-ui/icons/MenuRounded";
import HomeRounded from "@material-ui/icons/HomeRounded";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import SettingsRounded from "@material-ui/icons/SettingsRounded";
import PeopleAltRounded from "@material-ui/icons/PeopleAltRounded";
import InfoRounded from "@material-ui/icons/InfoRounded";
import Copyright from "../Copyright";
import { withRouter } from "react-router-dom";

import { useStyles } from "./MainStyles";

const Main = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuRounded />
          </IconButton>
          <IconButton onClick={() => props.history.push("/")} color="inherit">
            <HomeRounded />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Homepage
          </Typography>
          <IconButton onClick={() => props.history.push("/login")} color="inherit">
            <Badge badgeContent={4} color="secondary">
              <AccountCircleRounded />
            </Badge>
          </IconButton>
          <IconButton onClick={() => props.history.push("/settings")} color="inherit">
            <SettingsRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <MenuRounded />
          </IconButton>
        </div>
        <Divider light={true} />
        <List component="nav">
          <ListItem button onClick={() => props.history.push("/contact")}>
            <ListItemIcon>
              <PeopleAltRounded />
            </ListItemIcon>
            <ListItemText primary="Contact us" />
          </ListItem>
          <ListItem button onClick={() => props.history.push("/about")}>
            <ListItemIcon>
              <InfoRounded />
            </ListItemIcon>
            <ListItemText primary="About us" />
          </ListItem>
        </List>
        <Divider light={true} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            {props.children}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}


export default withRouter(Main)