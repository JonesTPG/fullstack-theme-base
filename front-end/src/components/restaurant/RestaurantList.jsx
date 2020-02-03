import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import matchSorter from 'match-sorter';

import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

import Grid from '@material-ui/core/Grid';
import Restaurant from './Restaurant';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  filter: {
    width: '132px',
    justify: 'center'
  }
}));

const RestaurantList = () => {
  const classes = useStyles();

  const [restaurants, setRestaurans] = useState([]);
  const options = [{ name: 'A to Z' }, { name: 'Z to A' }];

  useEffect(() => {
    axios.get('http://localhost:3001/restaurants').then(response => {
      setRestaurans(response.data);
      console.log(restaurants);
    });
  }, []);

  const handle = event => {
    const value = event.target.value;
    if (value === 'A to Z') {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => a.name.localeCompare(b.name)));
      return;
    }
  };

  const handleChange = event => {
    const value = event.target.value;
    if (value === 'AtoZ') {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => a.name.localeCompare(b.name)));
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
        <Autocomplete
          id="filter-demo"
          value={restaurants}
          onChange={() => console.log('filter')}
          style={{ width: 132 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Sort by:"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>

      <Grid container justify="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Sort by:</InputLabel>

          <Select
            value={restaurants}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value="AtoZ">A to Ö</MenuItem>
            <MenuItem value="ZtoA">Ö to A</MenuItem>
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
