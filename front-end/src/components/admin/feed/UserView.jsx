import React, { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {
  GET_ALL_USERS,
  USER_ADDED,
  USER_UPDATED,
  USER_DELETED,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER
} from '../../../queries/user';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserTable from './UserTable';
import CustomSnackbar from '../../notifications/CustomSnackbar';
import useNotification from '../../../hooks/notification';

const UserView = () => {
  const [userList, setUserList] = useState([]);
  const notification = useNotification();

  const { loading } = useQuery(GET_ALL_USERS, {
    onCompleted: data => {
      setUserList(data.user);
    },
    onError: error => {
      console.log(error);
      notification.showNotification('Error in fetching data', 'error');
    }
  });

  const [addUser] = useMutation(CREATE_USER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in adding an user', 'error');
    }
  });
  const [editUser] = useMutation(UPDATE_USER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in editing an user', 'error');
    }
  });

  const [removeUser] = useMutation(REMOVE_USER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in removing an user', 'error');
    }
  });

  useSubscription(USER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription add', subscriptionData);
      const newItem = subscriptionData.data.userAdded;
      setUserList([...userList, newItem]);
      notification.showNotification('Someone added a new user!', 'success');
    }
  });

  useSubscription(USER_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription update', subscriptionData);
      const newItem = subscriptionData.data.userUpdated;
      setUserList(userList.map(c => (c.id === newItem.id ? newItem : c)));
      notification.showNotification('Someone edited an user!', 'success');
    }
  });

  useSubscription(USER_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription delete', subscriptionData);
      const newItem = subscriptionData.data.userDeleted;
      setUserList(userList.filter(c => c.id !== newItem.id));
      notification.showNotification('Someone removed an user!', 'success');
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
        <UserTable
          users={userList}
          addUser={addUser}
          editUser={editUser}
          removeUser={removeUser}
        />
      </Grid>
      <CustomSnackbar {...notification.notificationProps()} />
    </Grid>
  );
};

export default UserView;
