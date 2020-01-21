export const resolvers = {
  Query: {
    /* if the default theme would not be available in the initialized local state of apollo client (defined at client.js),
         this resolver would be called to determine a value for the darkTheme property. */
    darkTheme: () => {
      return false;
    }
  }
};
