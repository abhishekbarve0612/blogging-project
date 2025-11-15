import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    fetch,
  }),
  cache: new InMemoryCache(),
})

export default apolloClient