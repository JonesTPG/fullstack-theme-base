import React, { useState } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL, CONTACT_ADDED } from '../../../queries/contact';

import Search from '../search/Search';
import Grid from '@material-ui/core/Grid';
import Contact from './Contact';

const ContactFeed = () => {
  const [contactList, setContactList] = useState([]);

  useQuery(GET_ALL, {
    onCompleted: data => {
      console.log(data);
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
      const newArray = [...contactList];
      newArray.unshift(newItem);
      setContactList(newArray);
    }
  });
  return (
    <>
      <Grid container justify="center" spacing={2}>
        {contactList.map((item, index) => (
          <Grid item key={index} xs={8} sm={8} md={8}>
            <Contact key={index} data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ContactFeed;
