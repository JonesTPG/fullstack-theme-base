import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { ME } from '../queries/login';

export const useRoles = () => {
  let [roles, setRoles] = useState(null);
  let token = useToken();

  useQuery(ME, {
    onCompleted(data) {
      if (data.me) {
        setRoles(data.me.roles);
      } else {
        setRoles(null);
      }
    }
  });
  return roles;
};

export const useToken = () => {
  const token = window.localStorage.getItem('theme-base-token');
  return token;
};
