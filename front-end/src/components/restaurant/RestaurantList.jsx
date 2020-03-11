import React, { useState, useRef, useEffect } from 'react';
import Restaurant from './Restaurant';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_RESTAURANTS } from '../../queries/restaurant';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: '#f0f0f0'
  },
  root: {
    display: 'flex'
  },
  formControl: {
    marginTop: '20px'
  },
  card: {
    padding: theme.spacing(1)
  }
}));

const RestaurantList = () => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = useState(0);
  const [value, setValue] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const { loading } = useQuery(GET_ALL_RESTAURANTS, {
    onCompleted: data => {
      if (data.restaurant) {
        setRestaurants(data.restaurant);
      }
    },
    onError: error => {
      console.log(error);
    }
  });
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const inputLabel = useRef(null);

  const handleChange = () => event => {
    setValue(event.target.value);

    if (event.target.value === '1') {
      const dataArray = [...restaurants];
      setRestaurants(dataArray.sort((a, b) => a.name.localeCompare(b.name)));

      return;
    } else if (event.target.value === '2') {
      const dataArray = [...restaurants];
      setRestaurants(dataArray.sort((a, b) => b.name.localeCompare(a.name)));

      return;
    }
  };

  return (
    <div className={classes.app}>
      <Grid container justify="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Sort by
          </InputLabel>
          <Select
            data-cy="atoz"
            native
            value={value}
            onChange={handleChange(value)}
            labelWidth={labelWidth}
            inputProps={{
              name: 'format',
              id: 'outlined-age-native-simple'
            }}
          >
            <option value="" />
            <option value={1}>A to Ö</option>
            <option value={2}>Ö to A</option>
          </Select>
        </FormControl>
      </Grid>
      {loading ? (
        <Grid container justify="center" className={classes.root}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container justify="center" className={classes.card}>
          {restaurants.map((restaurant, index) => (
            <Grid item key={index} className={classes.card}>
              <Restaurant key={index} data={restaurant} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default RestaurantList;
