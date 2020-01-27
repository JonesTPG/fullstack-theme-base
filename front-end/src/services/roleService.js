/* Determine if the roles object includes ADMIN or not. */
export const isAdmin = roles => {
  if (roles === null || roles === undefined || typeof roles !== Object) {
    return false;
  } else if (roles.includes('ADMIN')) {
    return true;
  }
};
