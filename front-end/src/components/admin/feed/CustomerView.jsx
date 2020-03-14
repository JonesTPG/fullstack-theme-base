import React, { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {
  GET_ALL_CUSTOMERS,
  CUSTOMER_ADDED,
  CUSTOMER_UPDATED,
  CUSTOMER_DELETED,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  REMOVE_CUSTOMER
} from '../../../queries/customer';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerTable from './CustomerTable';
import CustomSnackbar from '../../notifications/CustomSnackbar';
import useNotification from '../../../hooks/notification';

const CustomerView = () => {
  const [customerList, setCustomerList] = useState([]);
  const notification = useNotification();

  const { loading } = useQuery(GET_ALL_CUSTOMERS, {
    onCompleted: data => {
      setCustomerList(data.customer);
    },
    onError: error => {
      console.log(error);
      notification.showNotification('Error in fetching data', 'error');
    }
  });

  const [addCustomer] = useMutation(CREATE_CUSTOMER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in adding a customer', 'error');
    }
  });
  const [editCustomer] = useMutation(UPDATE_CUSTOMER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in editing a customer', 'error');
    }
  });

  const [removeCustomer] = useMutation(REMOVE_CUSTOMER, {
    onError(error) {
      console.log(error);
      notification.showNotification('Error in removing a customer', 'error');
    }
  });

  useSubscription(CUSTOMER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription add', subscriptionData);
      const newItem = subscriptionData.data.customerAdded;
      setCustomerList([...customerList, newItem]);
      notification.showNotification('Someone added a new customer!', 'success');
    }
  });

  useSubscription(CUSTOMER_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription update', subscriptionData);
      const newItem = subscriptionData.data.customerUpdated;
      setCustomerList(
        customerList.map(c => (c.id === newItem.id ? newItem : c))
      );
      notification.showNotification('Someone edited a customer!', 'success');
    }
  });

  useSubscription(CUSTOMER_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription delete', subscriptionData);
      const newItem = subscriptionData.data.customerDeleted;
      setCustomerList(customerList.filter(c => c.id !== newItem.id));
      notification.showNotification('Someone removed a customer!', 'success');
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
        <CustomerTable
          customers={customerList}
          addCustomer={addCustomer}
          editCustomer={editCustomer}
          removeCustomer={removeCustomer}
        />
      </Grid>
      <CustomSnackbar {...notification.notificationProps()} />
    </Grid>
  );
};

export default CustomerView;
