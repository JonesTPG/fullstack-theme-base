const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const app = require('./app');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const context = require('./context');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cors: {
    origin: '*',
    credentials: true
  }
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

httpServer.listen({ port: 4000 }, () =>
  console.log(
    `GraphQL server ready at http://localhost:4000${server.graphqlPath}`
  )
);
