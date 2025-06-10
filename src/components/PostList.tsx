import Link from 'next/link'
import { Button } from './ui/button'

interface Post {
  id: number
  title: string
  body: string
}

export function PostList({ id, title, body }: Post) {
  return (
    <ul className="space-y-4" key={id}>
        <li key={id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <Link
            href={`/posts/${id}`}
            className="text-rose-600 text-xl font-semibold hover:underline block line-clamp-1 mb-2"
          ><span className='line-clamp-1'>{title}</span>
        
          </Link>
          <div className="text-gray-700 line-clamp-2">{body}</div>
          <Link href={`/posts/${id}`}>
            <Button variant="default" className='cursor-pointer mt-2'>View Details</Button>
          </Link>
        </li>
    </ul>
  )
}
