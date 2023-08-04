'use client'

import { useState, useContext, useEffect, useMemo } from 'react'
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'

import BackButton from '@/components/back-btn'
import { CartContext } from '@/context/provider/cart'
import EmptyCart from '@/components/empty-cart'
import CartItemType from '@/types/type.cartItems'
import CouponComponent from './coupon.component'
import SubmitOrder from './submitOrder.component'

type Coupon =
   | {
        type: string
        value: number
     }
   | null
   | false

const Payment = () => {
   // @ts-ignore
   const { cart } = useContext(CartContext)

   const [paymentMethod, setPaymentMethod] = useState<string>('atTheDoor')
   const [coupon, setCoupon] = useState<Coupon>(null)
   const [couponValue, setCouponValue] = useState(0)
   const [price, setPrice] = useState(0)
   const [discount, setDiscount] = useState(0)
   const [paymentPrice, setPaymentPrice] = useState(0)

   const cartItems: CartItemType = useMemo(() => {
      return cart
   }, [cart])

   const router = useRouter()

   useEffect(() => {
      document.title = 'تبریزیان ایکامرس | پرداخت '
   }, [])

   useEffect(() => {
      let price = 0
      let discount = 0

      Object.values(cartItems).forEach((item) => {
         price += item.price * item.quantity
         discount += ((item.price * item.discount) / 100) * item.quantity
      })

      setPrice(price)
      setDiscount(discount)
      setPaymentPrice(price - discount)
   }, [cartItems, router])

   useEffect(() => {
      let couponValue = 0

      if (coupon) {
         if (coupon.type == 'PERCENTAGE') {
            couponValue = (coupon.value * (price - discount)) / 100
         } else if (coupon.type == 'PRICE') {
            couponValue = coupon.value
         } else return
      }

      couponValue = Math.round(couponValue / 1000) * 1000

      setCouponValue(couponValue)
      setPaymentPrice(Math.round((price - discount - couponValue) / 1000) * 1000)
   }, [price, coupon, discount])

   const changePaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod((event.target as HTMLInputElement).value)
   }

   return (
      <div className='mx-8 space-y-6'>
         {Object.keys(cartItems ?? {}).length ? (
            <>
               <div className='flex items-center justify-between'>
                  <BackButton />
                  <h1>پرداخت</h1>
                  <span></span>
               </div>

               <div className='md:grid md:justify-end flex flex-col-reverse md:grid-cols-2'>
                  <div className='md:mx-7 my-10 space-y-5'>
                     <div className='flex justify-between'>
                        <div className='flex space-x-1'>
                           <span className='text-slate-600 font-semibold'>تومان</span>
                           <span className='text-slate-600 font-semibold'>
                              {price.toLocaleString()}
                           </span>
                        </div>
                        <span className='text-slate-600 font-semibold'>
                           قیمت کالا ها ({Object.keys(cart ?? {}).length})
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <div className='flex space-x-1'>
                           <span className='text-black font-semibold'>تومان</span>
                           <span className='text-black font-semibold'>
                              {(price - discount - couponValue).toLocaleString()}
                           </span>
                        </div>
                        <span className='text-black font-semibold'>جمع سبد خرید</span>
                     </div>
                     {discount ? (
                        <div className='flex justify-between'>
                           <div className='flex space-x-1'>
                              <span className='text-red-500 font-semibold'>تومان</span>
                              <span className='text-red-500 font-semibold'>
                                 {(discount + couponValue).toLocaleString()} (%
                                 {Math.round(((discount + couponValue) * 100) / price)})
                              </span>
                           </div>
                           <span className='text-red-500 font-semibold'>سود شما از خرید</span>
                        </div>
                     ) : (
                        ''
                     )}

                     <SubmitOrder discountPrice={couponValue} paymentPrice={paymentPrice} />
                  </div>

                  <div className='space-y-6'>
                     <div className='bg-white rounded-xl py-5 px-3 space-y-6 text-right'>
                        <h3>انتخاب روش پرداخت</h3>

                        <form className='flex flex-col space-y-4 yekan1 rtl'>
                           <div className={'flex space-x-3 space-x-reverse text-slate-400'}>
                              {' '}
                              {/* ${paymentMethod=='internet'?'text-blue-400':'text-black'} */}
                              <input
                                 disabled
                                 checked={paymentMethod == 'internet'}
                                 onChange={changePaymentMethod}
                                 type='radio'
                                 id='methodInternet'
                                 name='methodOptions'
                                 value='internet'
                              />
                              <label
                                 htmlFor='methodInternet'
                                 className='flex space-x-3 space-x-reverse'
                              >
                                 <svg
                                    className='h-6 w-6'
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
                                    <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                    <rect x='3' y='5' width='18' height='14' rx='3' />{' '}
                                    <line x1='3' y1='10' x2='21' y2='10' />{' '}
                                    <line x1='7' y1='15' x2='7.01' y2='15' />{' '}
                                    <line x1='11' y1='15' x2='13' y2='15' />
                                 </svg>
                                 <div>پرداخت اینترنتی (غیرفعال)</div>
                              </label>
                           </div>

                           <div
                              className={`flex space-x-3 space-x-reverse ${
                                 paymentMethod == 'atTheDoor' ? 'text-blue-400' : 'text-black'
                              }`}
                           >
                              <input
                                 checked={paymentMethod == 'atTheDoor'}
                                 onChange={changePaymentMethod}
                                 type='radio'
                                 id='methodAtTheDoor'
                                 name='methodOptions'
                                 value='atTheDoor'
                              />
                              <label
                                 htmlFor='methodAtTheDoor'
                                 className='flex space-x-3 space-x-reverse'
                              >
                                 <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                    />
                                 </svg>
                                 <div>پرداخت درب منزل</div>
                              </label>
                           </div>
                        </form>
                     </div>

                     <div className='bg-white rounded-xl py-5 px-3'>
                        <CouponComponent price={paymentPrice} setCoupon={setCoupon} />

                        {couponValue ? (
                           <div className='text-center mt-5'>
                              <span className='text-green-700'>
                                 کد تخفیف با موفقیت اعمال شد: {couponValue.toLocaleString()} تومان
                              </span>
                           </div>
                        ) : (
                           ''
                        )}
                     </div>

                     <div className='bg-white rounded-xl py-5 px-3 space-y-6 text-right'>
                        <h3>خلاصه سفارش</h3>
                        <div className='space-x-5'>
                           <div className='flex justify-end space-x-3'>
                              {Object.values(cartItems).map((item) => {
                                 return (
                                    <div key={item.id} className='space-y-3'>
                                       <div className='relative'>
                                          <Image
                                             className='object-contain'
                                             src={item.thumbnail.src}
                                             alt={item.thumbnail.src}
                                             width='100'
                                             height='60'
                                          />

                                          <span
                                             style={{ fontSize: '.6rem' }}
                                             className='absolute left-0 bottom-0 p-1 px-2 bg-slate-200 rounded-md text-black'
                                          >
                                             {item.quantity}
                                          </span>
                                       </div>
                                       <div className='flex justify-center space-x-5 items-center'>
                                          <span
                                             style={{
                                                fontSize: '.6rem',
                                                color: 'black',
                                             }}
                                          >
                                             {item.size}
                                          </span>
                                          <span
                                             style={{ background: item.color }}
                                             className='block w-3 h-3 rounded-full shadow-[0_0_5px_#a4a4a4]'
                                          ></span>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>

                        <div className='flex justify-end space-x-3'>
                           <span className='toman_card'>{paymentPrice.toLocaleString()}</span>
                           <span>:جمع سبد خرید</span>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <EmptyCart />
         )}
      </div>
   )
}

export default Payment
