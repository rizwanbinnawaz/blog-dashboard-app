'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '@/hooks/posts'
import { PostForm } from '@/components/PostForm'
import { PostItem } from '@/components/PostItem'
import { PaginationControls } from '@/components/PaginationControls'
import { Skeleton } from '@/components/ui/skeleton'

const POSTS_PER_PAGE = 10

interface FormValues {
  title: string
  body: string
}

interface Post {
  id: number
  title: string
  body: string
}

export default function AdminPage() {
const { data: posts = [], isLoading: isLoadingPosts } = usePosts()
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()
  const deletePost = useDeletePost()

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const { reset } = useForm<FormValues>()
  const [editPostId, setEditPostId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    deletePost.mutate(id)
  }

  const editPost = posts.find((p:Post) => p.id === editPostId) || null

  useEffect(() => {
    if (editPost) {
      reset({ title: editPost.title, body: editPost.body })
    } else {
      reset({ title: '', body: '' })
    }
  }, [editPost, reset])

  const handlePostSubmit = (data: FormValues) => {
    if (editPostId !== null) {
      updatePost.mutate({ id: editPostId, title: data.title, body: data.body })
    } else {
      createPost.mutate({ title: data.title, body: data.body })
    }
    reset()
    setEditPostId(null)
  }

  return (
    <div className="container p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl">Admin Dashboard</h1>

      <PostForm
        initialValues={editPost ? { title: editPost.title, body: editPost.body } : undefined}
        onSubmit={handlePostSubmit}
        isEditing={!!editPost}
        isSubmitting={createPost.isPending || updatePost.isPending}
      />

      {isLoadingPosts ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded" />
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {currentPosts.map((post:Post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              onEdit={() => setEditPostId(post.id)}
              onDelete={() => handleDelete(post.id)}
              isDeleting={deletePost.isPending}
            />
          ))}
        </ul>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemCount={posts.length}
        pageSize={POSTS_PER_PAGE}
      />
    </div>
  )
}

