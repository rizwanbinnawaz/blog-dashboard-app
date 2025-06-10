import { api } from '@/lib/api'
import Link from 'next/link'

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await api.get(`/posts/${params.id}`).then(res => res.data)
  
  return (
    <main className="container p-6 max-w-4xl mx-auto space-y-6 min-h-screen flex flex-col">
      <Link href="/" className="text-rose-600 hover:underline text-sm">
        ← Back to Home
      </Link>

        <h1 className="mb-4 text-rose-600 text-xl font-semibold block mb-2">{post.title}</h1>
        <div>{post.body}</div>
    </main>
  )
}