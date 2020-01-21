import { useState } from 'react';
import { mainTheme, darkTheme } from '../AppStyles';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { ME } from '../queries/login';
import { CHANGE_THEME } from '../queries/theme';

export const useTheme = () => {
  let [theme, setTheme] = useState(mainTheme);

  const [changeTheme] = useMutation(CHANGE_THEME, {
    onCompleted({ data }) {
      console.log(data);
    },
    onError() {
      console.log('error');
    },
    refetchQueries: [ME]
  });

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
  return { theme, setMainTheme, setDarkTheme, changeTheme };
};
