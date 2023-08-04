'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress'

const DeleteButton = ({ id }: { id: string }) => {
   const [loading, setLoading] = useState(false)

   const router = useRouter()

   const deleteHandler = async (id: string) => {
      setLoading(true)

      const payload = { id }

      try {
         const res = await fetch('/api/brand', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('برند با موفقیت حذف گردید')
         router.refresh()
      } catch (err) {
         toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         {loading ? (
            <div className='flex justify-end my-1'>
               <CircularProgress color='inherit' size={20} />
            </div>
         ) : (
            <button className='flex justify-end' onClick={() => deleteHandler(id)}>
               <svg
                  className='h-4 w-4 text-red-500'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <line x1='18' y1='6' x2='6' y2='18' /> <line x1='6' y1='6' x2='18' y2='18' />
               </svg>
            </button>
         )}
      </>
   )
}

export default DeleteButton
