const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const context = require("./context");

const config = require("./utils/config");

let mongoUrl = config.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  mongoUrl = config.MONGODB_TEST_URI;
}

console.log(mongoUrl);
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
