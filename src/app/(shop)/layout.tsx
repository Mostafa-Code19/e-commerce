'use client'

import SearchInput from '@/components/search'
import '@/app/globals.scss'
import Navbar from '@/components/navbar'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <header>
            <SearchInput />
         </header>

         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>

         <Navbar />
      </>
   )
}