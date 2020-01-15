export const logOut = () => {
  window.localStorage.removeItem("theme-base-token");
  window.location.assign("/login");
};
