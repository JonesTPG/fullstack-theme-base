export const useToken = () => {
  const token = window.localStorage.getItem('theme-base-token');
  return token;
};
