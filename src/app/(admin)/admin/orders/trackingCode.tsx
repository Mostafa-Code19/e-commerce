'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { toast } from 'react-toastify'

const TrackingCode = ({
   orderId,
   availableTrackingCode,
}: {
   orderId: string
   availableTrackingCode: string
}) => {
   const [loading, setLoading] = useState(false)
   const [code, setCode] = useState(availableTrackingCode || '')

   const submitTrackingCode = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!code.length) return

      setLoading(true)

      const payload = {
         id: orderId,
         code: code,
      }

      try {
         const res = await fetch('/api/order/trackingCode', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('کد رهگیری با موفقیت ثبت گردید')
      } catch (err) {
         toast.error('خطایی در ثبت کد رهگیری رخ داد')
         console.error(err)
      }

      setLoading(false)
   }

   return (
      <div className='flex justify-between'>
         {loading ? (
            <div>
               <CircularProgress color='success' size={25} />
            </div>
         ) : (
            ''
         )}
         <form onSubmit={submitTrackingCode}>
            <input
               name='trackingCode'
               type='text'
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className='placeholder:text-slate-400 text-sm rounded-lg px-1 py-1 w-88'
               placeholder={code || ''}
            />
         </form>
         <label htmlFor='trackingCode'>
            <span>:کد رهگیری پستی</span>
         </label>
      </div>
   )
}

export default TrackingCode
