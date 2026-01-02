import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { endpoints } from '@/core/constants';

export function getGraphQLClient() {
  const token = localStorage.getItem('token');
  const orgId = localStorage.getItem('orgId');
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'x-auth-org': orgId || '',
      },
    };
  });
  const httpLink = createHttpLink({
    uri: endpoints.GRAPHQL,
    headers: {},
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
}
