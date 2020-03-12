import React from 'react';
import { Helmet } from 'react-helmet';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, withRouter } from 'react-router-dom';
import Feedback from '../feedback/Feedback';
import InteractiveMap from '../timetables/InteractiveMap';
import Timetable from '../timetables/Timetable';

import PageInfo from './page-info/PageInfo';
import ContactForm from '../contact/ContactForm';
import MainStyles from './MainStyles';
import FlowMain from '../flow/FlowMain';
import HeaderSidebar from './page-parts/HeaderSidebar';
import RestaurantList from '../restaurant/RestaurantList';

const Main = ({ classes }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>Theme Base - Main View</title>
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />
        <HeaderSidebar open={open} setOpen={setOpen} classes={classes} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <Switch>
            <Route path="/feedback" render={() => <Feedback />} />
            <Route path="/contact-us" render={() => <ContactForm />} />
            <Route path="/timetables" render={() => <Timetable />} />
            <Route path="/map" render={() => <InteractiveMap />} />
            <Route path="/flow" render={() => <FlowMain />} />
            <Route path="/restaurants" render={() => <RestaurantList />} />
            <Route path="/" render={() => <PageInfo />} />
          </Switch>
        </main>
      </div>
    </>
  );
};

const styledMain = withStyles(MainStyles)(Main);
export default withRouter(styledMain);
