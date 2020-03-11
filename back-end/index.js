import http from 'http';
import https from 'https';
import fs from 'fs';
import app from './app.js';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import schema from './schema';
import config from './utils/config';

/* Local SSL server to test out the secure websocket connections. */
if (process.env.NODE_ENV === 'development') {
  const localSslServer = https.createServer(
    {
      key: fs.readFileSync('./utils/key.pem'),
      cert: fs.readFileSync('./utils/cert.pem'),
      passphrase: 'nakkikostaja'
    },
    app
  );

  localSslServer.listen({ port: config.SSL_PORT }, () => {
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

  webServer.listen({ port: config.PORT }, () => {
    console.log('Server ready at localhost:4000');
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: schema
      },
      {
        server: webServer,
        path: '/subscriptions'
      }
    );
  });
}
