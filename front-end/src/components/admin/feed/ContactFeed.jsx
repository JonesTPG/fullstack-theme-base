import React, { useState } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, CONTACT_ADDED } from '../../../queries/contact';
import Grid from '@material-ui/core/Grid';
import Contact from './Contact';
import CircularProgress from '@material-ui/core/CircularProgress';

const ContactFeed = () => {
  const [contactList, setContactList] = useState([]);

  const { loading } = useQuery(GET_ALL, {
    onCompleted: data => {
      if (data.contact) {
        setContactList(data.contact);
      }
    },
    onError: error => {
      console.log(error);
    }
  });

  useSubscription(CONTACT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const newItem = subscriptionData.data.contactAdded;
      setContactList(contactList.concat(newItem));
    }
  });

  return (
    <Grid container justify="center" spacing={2}>
      {loading ? (
        <CircularProgress />
      ) : (
        contactList
          .slice()
          .reverse()
          .map((item, index) => (
            <Grid item key={index} xs={8} sm={8} md={8}>
              <Contact key={index} data={item} />
            </Grid>
          ))
      )}
    </Grid>
  );
};

export default ContactFeed;
