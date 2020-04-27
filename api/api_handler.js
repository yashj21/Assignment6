const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const prod = require('./products.js');
let aboutMessage = 'Product Manager API v1.0';
const resolvers = {
    Query: {
      about: () => aboutMessage,
      productList: prod.list,
      product: prod.get,
    },
    Mutation: {
      setAboutMessage,
      productAdd: prod.add,
      productUpdate: prod.productUpdate,
      productDelete: prod.remove,
    },
  };
  const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: (error) => {
      console.log(error);
      return error;
    },
  });

  function installHandler(app){
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql',cors: enableCors });

  }
    
  function setAboutMessage(_, { message }) {
    aboutMessage = message;
    return aboutMessage;
  }
  module.exports = { installHandler };