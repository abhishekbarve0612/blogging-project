import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const createClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetch,
    }),
    cache: new InMemoryCache(),
  })
}

export default createClient