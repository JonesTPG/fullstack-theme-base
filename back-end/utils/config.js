require('dotenv').config();

let PORT = process.env.PORT || 4000;
let SSL_PORT = process.env.SSL_PORT || 4001;
let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_TEST_URI = process.env.MONGODB_TEST_URI;
let JWT_SECRET = process.env.JWT_SECRET;
let GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
let GRAPHQL_SUBSCRIPTION_ENDPOINT =
  process.env.GRAPHQL_SUBSCRIPTION_ENDPOINT ||
  'wss://localhost:4000/subscriptions';
let SMTP_PORT = process.env.SMTP_PORT;
let SMTP_EMAIL_ACCOUNT = process.env.SMTP_EMAIL_ACCOUNT;
let SMTP_EMAIL_PASSWORD = process.env.SMTP_EMAIL_PASSWORD;
let SMTP_EMAIL_SERVER = process.env.SMTP_EMAIL_SERVER;

module.exports = {
  MONGODB_URI,
  MONGODB_TEST_URI,
  PORT,
  SSL_PORT,
  JWT_SECRET,
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  SMTP_PORT,
  SMTP_EMAIL_ACCOUNT,
  SMTP_EMAIL_PASSWORD,
  SMTP_EMAIL_SERVER
};
