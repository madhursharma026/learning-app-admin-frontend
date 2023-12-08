import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';

export default function App({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: 'https://learn.dreamstack.com/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
    },
  });

  return (
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
  )
}
