const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const schema = require('./schema');

/* Local SSL server to test out the secure websocket connections. */
if (process.env.NODE_ENV === 'development') {
  const localSslServer = https.createServer(
    {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
      passphrase: 'nakkikostaja'
    },
    app
  );

  localSslServer.listen({ port: 4001 }, () => {
    console.log('Local SSL server ready at localhost:4001');
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: schema
      },
      {
        server: localSslServer,
        path: '/subscriptions'
      }
    );
  });
} else {
  const webServer = http.createServer(app);

  webServer.listen({ port: 4000 }, () => {
    console.log('Server ready at localhost:4000');
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: schema
      },
      {
        server: webServer,
        path: '/graphql'
      }
    );
  });
}
