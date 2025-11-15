import { createSchema, createYoga } from "graphql-yoga"
import { NextRequest } from "next/server"


const posts = [
  {
    id: "1",
    slug: "hello-world",
    title: "Hello World",
    content: "This is a test post",
  },
  {
    id: "2",
    slug: "hello-world-2",
    title: "Hello World 2",
    content: "This is a test post 2",
  },
]

const typeDefs = /* GraphQL */ `
  type Post {
    id: ID!
    slug: String!
    title: String!
    content: String!
  }

  type Query {
    health: String!
    posts: [Post!]!
  }
`

const resolvers = {
  Query: {
    health: () => "OK",
    posts: () => posts,
  },
}

const schema = createSchema<{ request: NextRequest }>({
  typeDefs,
  resolvers,
})

const yoga = createYoga<{ request: NextRequest }>({
  schema: schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: {
    Request: Request,
    Response: Response,
  }
})

export const GET = yoga.fetch
export const POST = yoga.fetch