import React from 'react';
import Feed from './feed/Feed';
import { Route } from 'react-router-dom';
import { ME } from '../../queries/login';
import { useQuery } from 'react-apollo';

const AdminContent = () => {
  const { data, loading } = useQuery(ME);

  if (loading) {
    return <p>loading</p>;
  } else if (!data.me.roles.includes('ADMIN')) {
    return <p>you do not have permissions to access this page</p>;
  } else {
    return (
      <>
        <Route path="/admin/feedback" render={() => <Feed />} />
      </>
    );
  }
};
export default AdminContent;
