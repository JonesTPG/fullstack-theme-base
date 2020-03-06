import { useMutation } from '@apollo/react-hooks';

import { CHANGE_THEME, GET_LOCAL_THEME } from '../queries/theme';

export const useTheme = () => {
  const [changeTheme] = useMutation(CHANGE_THEME, {
    onCompleted() {},
    onError(error) {
      console.log(error);
    },

    update: cache => {
      const data = cache.readQuery({
        query: GET_LOCAL_THEME
      });
      console.log(data);
      const dataCopy = { ...data, darkTheme: !data.darkTheme };
      cache.writeQuery({
        query: GET_LOCAL_THEME,
        data: dataCopy
      });
    }
  });

  return { changeTheme };
};
