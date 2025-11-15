import "dotenv/config"
import POSTS from "../data/posts"
import USERS from "../data/users"
import type { User } from "../lib/generated/prisma/browser"
import { PrismaClient } from "../lib/generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create all users
  const createdUsers: User[] = await Promise.all(
    USERS.map(user =>
      prisma.user.create({
        data: user
      })
    )
  )

  // Create a map of email to user ID for lookup
  const emailToUserId = createdUsers.reduce((acc: Record<string, string>, user: User) => {
    acc[user.email] = user.id
    return acc
  }, {} as Record<string, string>)

  // Create posts with proper authorId (UUID) by looking up the email
  await prisma.post.createMany({
    data: POSTS.map(post => ({
      title: post.title,
      slug: post.slug,
      content: post.content,
      authorId: emailToUserId[post.authorEmail]
    })),
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
