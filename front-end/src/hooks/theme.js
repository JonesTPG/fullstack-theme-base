import { useState } from 'react';
import { mainTheme, darkTheme } from '../AppStyles';

import { useQuery } from '@apollo/react-hooks';
import { ME } from '../queries/login';

export const useTheme = () => {
  let [theme, setTheme] = useState(null);

  useQuery(ME, {
    onCompleted(data) {
      console.log(data);
      if (data.me) {
        data.me.darkTheme === true ? setTheme(darkTheme) : setTheme(mainTheme);
      } else {
        setTheme(mainTheme);
      }
    }
  });

  const setMainTheme = () => {
    setTheme(mainTheme);
  };
  const setDarkTheme = () => {
    setTheme(darkTheme);
  };
  return { theme, setMainTheme, setDarkTheme };
};
