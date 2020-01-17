import React from 'react';
import Feedback from '../../feedback/Feedback';
import Main from '../Main';
import { useToken } from '../../../hooks/auth';

const HomePage = () => {
  const token = useToken();

  if (!token) {
    return (
      <Main pageName="Homepage">
        <p>you are not logged in</p>
      </Main>
    );
  } else {
    return (
      <Main pageName="Homepage">
        <Feedback />
      </Main>
    );
  }
};

export default HomePage;
