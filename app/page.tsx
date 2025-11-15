'use client'

import { gql } from "@apollo/client";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import apolloClient from "@/lib/apolloClient";
import type { Post } from "@/lib/types";
import styles from "./page.module.css";

const AllPosts = gql`
    query {
      posts {
        id
        title
      }
    }
`

function Posts() {
  const { data, loading, error } = useQuery<any>(AllPosts)

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {
          data?.posts?.map((post: Post) => (
            <li key={post.id}>
              {post.title}
            </li>
          ))
        }
      </main>
    </div>
  );
}

function Home() {
  return (

    <ApolloProvider client={apolloClient}>
      <Posts />
    </ApolloProvider>
  )
}

export default Home;