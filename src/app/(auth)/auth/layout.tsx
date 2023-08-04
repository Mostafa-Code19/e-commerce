'use client'

import '@/app/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <SessionProvider>
            <ToastContainer
               position='top-right'
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme='light'
            />

            {children}
         </SessionProvider>
      </>
   )
}
