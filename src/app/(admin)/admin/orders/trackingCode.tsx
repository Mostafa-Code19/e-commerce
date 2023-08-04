'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

const TrackingCode = ({
   orderId,
   availableTrackingCode,
}: {
   orderId: string
   availableTrackingCode: string | null
}) => {
   const [loading, setLoading] = useState(false)

   const trackingCodeRef = useRef<HTMLInputElement>(null)

   const submitTrackingCode = async () => {
      setLoading(true)

      const trackingCode = trackingCodeRef?.current?.value

      if (!trackingCode) {
         setLoading(false)
         return toast.warning('هیچ کدرهگیری برای ثبت وارد نشده است')
      }

      const payload = {
         id: orderId,
         trackingCode: trackingCode,
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
      <div className='space-x-2'>
         <div className='flex justify-end space-x-3 items-center'>
            {loading ? (
               <div>
                  <CircularProgress color="success" size={25} />
               </div>
            ) : (
               <button onClick={submitTrackingCode}>
                  <svg
                     className='h-6 w-6 text-green-700'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     strokeWidth='2'
                     stroke='currentColor'
                     fill='none'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     {' '}
                     <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                     <path d='M9 12l2 2l4 -4' />
                  </svg>
               </button>
            )}
            <input
               ref={trackingCodeRef}
               name='trackingCode'
               type='text'
               className='placeholder:text-slate-400 text-sm rounded-lg px-1 py-1 w-88'
               placeholder={trackingCodeRef.current?.value || availableTrackingCode || ''}
            />
            <label htmlFor='trackingCode'>
               <span>:کد رهگیری پستی</span>
            </label>
         </div>
      </div>
   )
}

export default TrackingCode
