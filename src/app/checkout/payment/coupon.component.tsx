import { useState, useRef, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

type Discount =
   | {
        type: string
        value: number
     }
   | null
   | false

let previousCoupon = ''

const CouponComponent = ({
   price,
   setCoupon,
}: {
   price: number,
   setCoupon: Dispatch<SetStateAction<Discount>>
}) => {
   const [loading, setLoading] = useState(false)
   const couponRef = useRef<HTMLInputElement>(null)

   const couponCheck = async () => {
      setLoading(true)
      const couponCode = couponRef?.current?.value

      if (couponCode?.length && couponCode !== previousCoupon) {
         previousCoupon = couponCode

         try {
            const res = await axios.get(`/api/coupon?c=${couponCode}`)
            let couponData = res.data
            if (couponData) {
               if (couponData.value > price) couponData.value = price

               setCoupon(couponData)
               toast.success('تخفیف با موفقیت به شما تعلق گرفت')
            } else {
               toast.error('کد تخفیف وارد شده منقضی یا نامعتبر می‌باشد')
            }
         } catch (err) {
            console.log('err couponCheck', err)
            toast.error('به مشکلی برخوردیم! لطفا مجدد تلاش کنید.')
         }
      } else {
         if (!couponCode?.length) toast.error('لطفا ابتدا کد تخفیف را وارد نمایٔید')
      }

      setLoading(false)
   }

   return (
      <div className='flex justify-between items-center'>
         <div className='border rounded-lg px-4 py-2 space-x-4 relative'>
            {loading ? (
               <span className='text-green-700 inline-block my-4 absolute -top-1'>
                  در حال بررسی...
               </span>
            ) : (
               <button disabled={loading} onClick={couponCheck}>
                  <span>ثبت</span>
               </button>
            )}
            <input
               ref={couponRef}
               type='text'
               className='text-right text-sm'
               placeholder='کد تخفیف'
            />
         </div>
         <h3>کد تخفیف</h3>
      </div>
   )
}

export default CouponComponent
