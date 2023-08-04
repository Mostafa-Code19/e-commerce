'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const LogoutButton = () => {
   const [loading, setLoading] = useState(false)

   const submitLogout = () => {
      setLoading(true)
      signOut({ callbackUrl: '/' })
   }

   return (
      <div className='border-2 hover:shadow-lg shadow-red-300 transition-shadow border-red-700 text-red-700 text-center w-full py-2 yekan1 rounded-xl'>
         {loading ? (
            <CircularProgress color='inherit' size={30} />
         ) : (
            <button className='w-full' disabled={loading} onClick={() => submitLogout()}>
               خروج از حساب
            </button>
         )}
      </div>
   )
}

export default LogoutButton
