const http = require('http');
const app = require('./app');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const schema = require('./schema');

const httpServer = http.createServer(app);

httpServer.listen({ port: 4000 }, () => {
  console.log('Server ready at localhost:4000');
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: schema
    },
    {
      server: httpServer,
      path: '/graphql'
    }
  );
});
