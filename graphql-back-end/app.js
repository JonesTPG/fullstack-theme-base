const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const schema = require('./schema');
const context = require('./context');

const config = require('./utils/config');

let mongoUrl = config.MONGODB_URI;

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

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(express.static('build'));
app.use(bodyParser.json());

const apolloServer = new ApolloServer({
  schema,
  context
});

apolloServer.applyMiddleware({ app });

module.exports = app;
