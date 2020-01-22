import React from 'react';
import Main from '../Main';
import { useToken } from '../../../hooks/auth';
import PageInfo from '../page-info/PageInfo';

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
        <PageInfo />
      </Main>
    );
  }
};

export default HomePage;
