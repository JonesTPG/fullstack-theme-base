import React, { useState } from 'react';

import { useSubscription } from '@apollo/react-hooks';
import { THEME_CHANGED } from '../../../queries/theme';

import Search from '../search/Search';
import Grid from '@material-ui/core/Grid';
import ThemeChange from './ThemeChange';

const ThemeChangeFeed = () => {
  const [themeList, setThemeList] = useState([]);
  useSubscription(THEME_CHANGED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newItem = subscriptionData.data.userChangedTheme;
      const newArray = [...themeList];
      newArray.unshift(newItem);
      setThemeList(newArray);
    }
  });

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10} sm={10} md={10}>
          <Search />
        </Grid>
        {themeList.map((item, index) => (
          <Grid item key={index} xs={8} sm={8} md={8}>
            <ThemeChange key={index} data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ThemeChangeFeed;
