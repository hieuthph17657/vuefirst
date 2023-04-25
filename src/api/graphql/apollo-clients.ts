import type { NormalizedCacheObject, ServerError } from '@apollo/client/core';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, } from '@apollo/client/core';
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import type { NormalizedCacheObject} from '@apollo/client/core';
// import { ApolloCache } from 'apollo-cache';
//import { ApolloLink } from 'apollo-link';

// HTTP connection to the API
const getHeader = () => {
  const headers: {'Content-Type'?: string, 'Access-Control-Allow-Origin'?: string} = {};
  headers['Content-Type'] = 'application/json';
  headers['Access-Control-Allow-Origin'] = '*';
  return headers;
};
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4001/graphql',
  //headers: getHeader()
})

// Cache implementation
const cache = new InMemoryCache()

// const authMiddleware = new ApolloLink();

  

// Create the apollo client
const apolloClient= new ApolloClient({
  
  link: httpLink,
  cache,
})

export {apolloClient as default };