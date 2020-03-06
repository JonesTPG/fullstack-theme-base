import React from 'react';

import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import FeatureSlider from './detail/FeatureSlider';

const FlowMain = () => {
  return (
    <>
      <p>flow main</p>
      <Switch>
        <Route exact path="/flow" render={() => <HomePage />} />
        <Route path="/flow/:id" render={() => <FeatureSlider />} />
      </Switch>
    </>
  );
};

export default FlowMain;
