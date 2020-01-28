const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');

console.log('commecting to mongodb');

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

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

module.exports = app;
