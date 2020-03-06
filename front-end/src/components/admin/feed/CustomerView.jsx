import React, { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL_CUSTOMERS, CUSTOMER_ADDED } from '../../../queries/customer';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerTable from './CustomerTable';

const UserCreationFeed = () => {
  const [customerList, setCustomerList] = useState([]);

  const { loading } = useQuery(GET_ALL_CUSTOMERS, {
    onCompleted: data => {
      if (data.customer) {
        setCustomerList(data.customer);
      }
    },
    onError: error => {
      console.log(error);
    }
  });

  useSubscription(CUSTOMER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newItem = subscriptionData.data.userAdded;
      setCustomerList(customerList.concat(newItem));
    }
  });
  console.log(customerList);
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
        <CustomerTable customers={customerList} />
      </Grid>
    </Grid>
  );
};

export default UserCreationFeed;
