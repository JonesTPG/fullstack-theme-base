const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const schema = require('./schema');
const context = require('./context');

const config = require('./utils/config');

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
  playground: {}
});

apolloServer.applyMiddleware({ app });

// catch-all route (needed because front-end uses react router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;
