import { createYoga } from "graphql-yoga"
import type { Context } from "@/graphql/context"
import schema from "@/graphql/schema"
import prisma from "@/lib/prisma"

// const schema = createSchema<Context>({
//   typeDefs,
//   resolvers,
// })


const { handleRequest } = createYoga<Context>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  context: async () => ({
    prisma,
  }),
})

export { handleRequest as GET, handleRequest as POST }