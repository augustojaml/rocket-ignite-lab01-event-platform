import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4tz4s3k0ffi01uk4mxwbdrg/master',
  cache: new InMemoryCache(),
});
