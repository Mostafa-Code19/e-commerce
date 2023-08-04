'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const BrandNewInput = () => {
   const [inputValue, setInputValue] = useState('')
   const [loading, setLoading] = useState(false)

   const router = useRouter()

   const addBrand = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (inputValue.trim()) {
         const payload = {
            name: inputValue.trim().toLowerCase(),
         }

         try {
            const res = await fetch('/api/brand', {
               method: 'POST',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status === 405) return toast.warning('این برند از قبل ثبت شده است')

            setInputValue('')
            toast.success('برند با موفقیت ثبت گردید')
            router.refresh()
         } catch (err) {
            toast.warning('در ثبت برند خطایی رخ داد')
            console.error(err)
         } finally {
            setLoading(false)
         }
      } else return setLoading(false)
   }

   return (
      <>
         <form onSubmit={addBrand} className='flex justify-center space-x-3 w-full'>
            <button type='submit'>
               <svg
                  className='h-8 w-8 text-black'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>
            </button>
            <input
               onChange={(e) => setInputValue(e.target.value)}
               value={inputValue}
               className='rounded-lg bg-slate-200 w-full rtl pr-6'
               type='text'
               placeholder='نام برند ...'
            />
         </form>
         <Backdrop
            sx={{
               color: '#fff',
               zIndex: (theme) => theme.zIndex.drawer + 1,
               height: '100vh',
            }}
            open={loading}
         >
            <CircularProgress color="inherit" size={50} />
         </Backdrop>
      </>
   )
}

export default BrandNewInput
