import SchemaBuilder from "@pothos/core"
import type { Post } from "@/lib/types"

const builder = new SchemaBuilder({})

const PostRef = builder.objectRef<Post>('Post')

PostRef.implement({
  description: 'A blog post',
  fields: (t) => ({
    id: t.exposeID('id', { description: 'Unique identifier' }),
    slug: t.exposeString('slug', { description: 'URL-friendly slug' }),
    title: t.exposeString('title', { description: 'Post title' }),
    content: t.exposeString('content', { description: 'Post content' }),
  }),
})


builder.queryType({
  fields: (t) => ({
    health: t.string({
      description: 'Health check endpoint',
      resolve: () => 'OK',
    }),
    posts: t.field({
      type: [PostRef],
      description: 'Get all blog posts',
      resolve: async (_parent, _args, context: any) => {
        return await context.prisma.post.findMany()
      },
    }),
  }),
})

// export const typeDefs = `#graphql
//     type Post {
//       id: ID!
//       slug: String!
//       title: String!
//       content: String!
//     }

//     type Query {
//       health: String!
//       posts: [Post!]!
//     }
// `

// export default typeDefs


const schema = builder.toSchema()

export default schema