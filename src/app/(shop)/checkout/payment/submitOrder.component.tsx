import CartItemType from '@/types/type.cartItems'
import { CartContext } from '@/context/provider/cart'

import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const SubmitOrder = ({
   discountPrice,
   paymentPrice,
}: {
   discountPrice: number
   paymentPrice: number
}) => {
   // @ts-ignore
   const { cart, dispatch } = useContext(CartContext)
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const cartItems: CartItemType = useMemo(() => {
      return cart
   }, [cart])

   const submit = async () => {
      setLoading(true)

      const payload = {
         cart: cartItems,
         discount: discountPrice,
         price: paymentPrice,
      }

      try {
         const res = await fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const { id, message } = await res.json()

         if (message == 'unAuthorized')
            toast.warning(
               <Link href='/auth/login'>ابتدا می‌بایست وارد شوید! برای ورود کلیک کنید</Link>,
               { autoClose: 10000 },
            )
         else if (message == 'userNotFound') toast.error('در دریافت اطلاعات کاربر خطایی رخ داد!')
         else if (message == 'incompleteProfile')
            toast.warning(
               <Link href='/profile/edit'>
                  برای ثبت نهایی سفارش می‌بایست اطلاعات پروفایل خود را کامل کنید. برای ورود کلیک
                  کنید
               </Link>,
               { autoClose: 10000 },
            )
         else if (message == 'qtyNotEnough')
            toast.error(
               `تعداد موجودی "${cartItems[id].title}" ${cartItems[id].quantity} عدد است. لطفا پس از تغییر سبد خرید خود مجدد تلاش کنید.`,
            )
         else if (id) {
            dispatch({ type: 'RESET' })
            router.push(`/checkout/payment/success?id=${id}`)
         }
      } catch (err) {
         toast.error('خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full py-3 text-center rounded-xl yekan1'>
         {loading ? (
            <CircularProgress color="inherit" size={25} />
         ) : (
            <button className='w-full' disabled={loading} onClick={submit}>
               پرداخت
            </button>
         )}
      </div>
   )
}

export default SubmitOrder
