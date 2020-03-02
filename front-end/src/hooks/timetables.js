import { PLAN_ROUTE } from '../queries/route';
import { useState, useEffect } from 'react';
import { createApolloFetch } from 'apollo-fetch';

const fetch = createApolloFetch({
  uri: 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql'
});

/**
 * @description Hook for getting a timetable between two points. Offers methods for swapping direction and refreshing the timetable.
 * @param {object} pointA Latitude and longitude for the source point
 * @param {object} pointB Latitude and longitude for the destination point
 * @returns {boolean} loading that tells if query has finished
 * @returns {object} data that includes the query response in JSON format
 * @returns {object} error that contains the error message if an error occured during the query
 * @returns {function} changeDestination that updates the destination point
 * @returns {function} switchDirection that changes direction between the endpoints
 * @returns {function} refresh that makes a new query with new variables
 * @returns {array} placeNames that includes the names of the endpoints
 */
export const useTimetables = (pointA, pointB) => {
  const [places, setPlaces] = useState([pointA, pointB]);
  const [placeNames, setPlaceNames] = useState(['Eficode HQ', 'TUT']);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const from = places[0];
  const to = places[1];

  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours() * 60 * 60 +
    now.getMinutes() * 60 +
    now.getSeconds()}`;

  useEffect(() => {
    setLoading(true);
    refetch({
      variables: {
        fromLat: from.lat,
        fromLon: from.lon,
        toLat: to.lat,
        toLon: to.lon,
        date,
        time
      }
    });
  }, [from, to, date, time]);

  // Query that fetches data from the API endpoint
  const refetch = variables => {
    fetch(PLAN_ROUTE, variables)
      .then(res => {
        console.log('Response', res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setData(null);
        setLoading(false);
      });
  };

  // Changes the destination point
  const changeDestination = (newCoords, newName) => {
    setPlaces([pointA, newCoords]);
    setPlaceNames(['Eficode HQ', newName]);
  };

  // Fetches fresh itineraries
  const refresh = () => {
    setNow(new Date());
  };

  // Changes the order in state variables
  const switchDirection = () => {
    setPlaces([to, from]);
    setPlaceNames([placeNames[1], placeNames[0]]);
  };

  return {
    loading,
    data,
    changeDestination,
    switchDirection,
    refresh,
    placeNames
  };
};
