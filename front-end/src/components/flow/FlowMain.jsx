import React from 'react';

import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import FeatureSlider from './detail/FeatureSlider';

const FlowMain = () => {
  return (
    <>
      <p>flow main</p>
      <Switch>
        <Route path="/" render={() => <HomePage />} />
        <Route exact path="/:id" render={() => <FeatureSlider />} />
      </Switch>
    </>
  );
};

export default FlowMain;
