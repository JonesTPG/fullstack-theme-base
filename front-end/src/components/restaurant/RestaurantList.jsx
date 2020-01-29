import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Restaurant from './Restaurant';
import Typography from '@material-ui/core/Typography';

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { IconButton } from '@material-ui/core';

const ContactFeed = () => {
  const [restaurants, setRestaurans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/restaurants').then(response => {
      setRestaurans(response.data);
      console.log(restaurants);
    });
  }, []);

  const sortByAlph = () => {
    const dataArray = [...restaurants];
    setRestaurans(dataArray.sort((a, b) => a.name.localeCompare(b.name)));
  };
  return (
    <div>
      <Grid container justify="center">
        <Typography variant="h6">
          Not All Heroes Wear Capes
          <IconButton onClick={sortByAlph}>
            <SortByAlphaIcon />
          </IconButton>
        </Typography>
      </Grid>
      <Grid container justify="center"></Grid>

      <Grid container justify="center" spacing={2}>
        {restaurants.map((restaurant, index) => (
          <Grid item key={index}>
            <Restaurant key={index} data={restaurant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContactFeed;
