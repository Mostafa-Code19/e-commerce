'use client'

import './globals.scss'
import Navbar from '@/components/navbar'
import { CartContextProvider } from '@/context/provider/cart'
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
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
            
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <main className='mb-24'>
              {children}
            </main>

            <Navbar />
          </CartContextProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
