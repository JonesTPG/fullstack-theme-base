import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';

import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import schema from './schema';
import context from './context';

import config from './utils/config';

let mongoUrl = config.MONGODB_URI;

const app = express();

if (process.env.NODE_ENV === 'test') {
  mongoUrl = config.MONGODB_TEST_URI;
}

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(error => {
    console.log('error connecting to mongodb: ', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

const apolloServer = new ApolloServer({
  schema,
  context,
  playground: {
    endpoint: config.GRAPHQL_ENDPOINT,
    subscriptionEndpoint: config.GRAPHQL_SUBSCRIPTION_ENDPOINT
  }
});

apolloServer.applyMiddleware({ app });

// catch-all route (needed because front-end uses react router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

export default app;
