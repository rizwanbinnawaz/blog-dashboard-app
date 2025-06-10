'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <header className="bg-rose-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          🌸 My Blog App
        </Link>
        {isAdmin ? (
          <Link href="/">
            <Button variant="default" className='cursor-pointer'>Home</Button>
          </Link>
        ) : (
          <Link href="/admin">
            <Button variant="default" className='cursor-pointer'>Admin Page</Button>
          </Link>
        )}
      </div>
    </header>
  )
}

