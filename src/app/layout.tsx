import './globals.scss'
import Navbar from '../components/navbar'
import { CartContextProvider } from '@/context/provider/cart'

export const metadata = {
  title: 'Shoe E-Commerce',
  description: 'Create by Me <3',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <header>
            <div className='flex justify-center relative mt-5'>
              <svg className="h-7 w-7 absolute left-8 top-1 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input className='rounded-xl w-full mx-7 pl-10 py-2' type="text" placeholder='Search' />
            </div>
          </header>

          <main className='mb-24'>
            {children}
          </main>

          <Navbar />
        </CartContextProvider>
      </body>
    </html>
  )
}
