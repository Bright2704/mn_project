import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import { AuthProvider } from "./Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MN168',
  description: 'Chinese and Thai cargo services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'${inter.className} text-slate-700'}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
          <NavBar/>
          <main className='flex-grow '>{children}</main>
          <Footer/>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
