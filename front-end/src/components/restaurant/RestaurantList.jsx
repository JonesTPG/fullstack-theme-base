import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Restaurant from './Restaurant';
import Typography from '@material-ui/core/Typography';

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { IconButton } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const RestaurantList = () => {
  const classes = useStyles();
  const [restaurants, setRestaurans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/restaurants').then(response => {
      setRestaurans(response.data);
      console.log(restaurants);
    });
  }, []);

  const handleChange = event => {
    const value = event.target.value;
    if (value === 'AtoZ') {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => a.name < b.name));
      return;
    } else if (value === 'ZtoA') {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => b.name.localeCompare(a.name)));
      return;
    } else if (value === 'LtoH') {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => b.price.localeCompare(a.price)));
    }
  };
  return (
    <div>
      <Grid container justify="center">
        <Typography variant="h6">
          Not All Heroes Wear Capes
          <span aria-label="a rocket blasting off" role="img">
            🚀
          </span>
        </Typography>
      </Grid>
      <Grid container justify="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Sort by:
          </InputLabel>
          <Select
            value={restaurants}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value="AtoZ">A to Z</MenuItem>
            <MenuItem value="ZtoA">Z to A</MenuItem>
            <MenuItem value="LtoH">Price: Low to High</MenuItem>
            <MenuItem value={20}>Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Grid>

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

export default RestaurantList;
