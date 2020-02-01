import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { persistCache } from 'apollo-cache-persist';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { useToken } from '../hooks/auth';
import { resolvers } from './resolvers';

console.log(process.env.REACT_APP_WEBSOCKET_URL);
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WEBSOCKET_URL + 'graphql',
  options: { reconnect: true }
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL + 'graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = useToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache,
  resolvers
});

persistCache({
  cache: cache,
  storage: window.localStorage
});

const data = {
  feedbackList: [],
  darkTheme: false
};

cache.writeData({ data });

client.onResetStore(() => cache.writeData({ data }));

export default client;
