import React, { useState } from 'react';

import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import FeatureSlider from './detail/FeatureSlider';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, PROJECT_ADDED } from '../../queries/project';

const FlowMain = () => {
  const [projects, setProjects] = useState([]);
  const { loading } = useQuery(GET_ALL, {
    onCompleted: data => {
      if (data.project) {
        setProjects(data.project);
      }
    },
    onError: error => {
      console.log(error);
    }
  });

  useSubscription(PROJECT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newItem = subscriptionData.data.projectAdded;
      setProjects(projects.concat(newItem));
    }
  });

  return (
    <>
      <Switch>
        <Route
          exact
          path="/flow"
          render={() => <HomePage data={projects} loading={loading} />}
        />
        <Route path="/flow/:id" render={() => <FeatureSlider />} />
      </Switch>
    </>
  );
};

export default FlowMain;
