/* Common logout operations. */
export const logOut = () => {
  window.localStorage.removeItem('theme-base-token');
};
