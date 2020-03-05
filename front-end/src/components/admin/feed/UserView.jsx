import React, { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, USER_ADDED } from '../../../queries/user';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserTable from './UserTable';

const UserCreationFeed = () => {
  const [userList, setUserList] = useState([]);

  const { loading } = useQuery(GET_ALL, {
    onCompleted: data => {
      if (data.user) {
        setUserList(data.user);
      }
    },
    onError: error => {
      console.log(error);
    }
  });

  useSubscription(USER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newItem = subscriptionData.data.userAdded;
      setUserList(userList.concat(newItem));
    }
  });

  if (loading) {
    return (
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <UserTable users={userList} />
      </Grid>
    </Grid>
  );
};

export default UserCreationFeed;
