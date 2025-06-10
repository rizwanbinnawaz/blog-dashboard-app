import Footer from '@/components/Footer'
import './globals.css'
import { ReactQueryProvider } from './react-query-provider'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer/>
          </ReactQueryProvider>
      </body>
    </html>
  )
}