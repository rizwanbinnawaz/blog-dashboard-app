'use client'

import { useState } from 'react'
import { PaginationControls } from '@/components/PaginationControls'
import { usePosts } from '@/hooks/posts'
import { Skeleton } from '@/components/ui/skeleton'
import { PostList } from '@/components/PostList'
import Banner from '@/components/Banner'

interface Post {
  id: number
  title: string
  body: string
}

const POSTS_PER_PAGE = 10

export default function Home() {
  const { data: posts = [], isLoading: isLoadingPosts } = usePosts()
  const [currentPage, setCurrentPage] = useState(1)


  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="container p-6 max-w-4xl mx-auto space-y-6">
        <Banner />
        {isLoadingPosts ? (
          <div className="space-y-4 w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded" />
            ))}
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {currentPosts.map((post: Post) => (
                <PostList 
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                />
              ))}
            </ul>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemCount={posts.length}
              pageSize={POSTS_PER_PAGE}
            />
          </>
        )}
      </main>

    </div>
  )
}
