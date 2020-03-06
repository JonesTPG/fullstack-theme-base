import React, { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {
  GET_ALL_CUSTOMERS,
  CUSTOMER_SUBSCRIPTION,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  REMOVE_CUSTOMER
} from '../../../queries/customer';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerTable from './CustomerTable';

const UserCreationFeed = () => {
  const [customerList, setCustomerList] = useState([]);

  const { loading } = useQuery(GET_ALL_CUSTOMERS, {
    onCompleted: data => {
      setCustomerList(data.customer);
    },
    onError: error => {
      console.log(error);
    }
  });

  const [addCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted: data => {
      console.log(data);
      setCustomerList([...customerList, data.createCustomer]);
    },
    onError(error) {
      console.log(error);
    }
  });
  const [editCustomer] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: data => {
      console.log(data);
      setCustomerList(
        customerList.map(c => {
          console.log(data.updateCustomer.id, c.id);
          return c.id === data.updateCustomer.id ? data.updateCustomer : c;
        })
      );
    },
    onError(error) {
      console.log(error);
    }
  });
  const [removeCustomer] = useMutation(REMOVE_CUSTOMER, {
    onCompleted: data => {
      console.log(data);
      setCustomerList(
        customerList.filter(c => c.id !== data.removeCustomer.id)
      );
    },
    onError(error) {
      console.log(error);
    }
  });

  useSubscription(CUSTOMER_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newData = subscriptionData.data;
      if (newData.customerAdded) {
        setCustomerList(customerList.concat(newData.customerAdded));
      } else if (newData.customerUpdated) {
        setCustomerList(
          customerList.map(c =>
            c.id === newData.customerUpdated.id ? newData.customerUpdated : c
          )
        );
      } else if (newData.customerDeleted) {
        setCustomerList(
          customerList.filter(c => c.id !== newData.customerDeleted.id)
        );
      }
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
    </Grid>
  );
};

export default UserCreationFeed;
