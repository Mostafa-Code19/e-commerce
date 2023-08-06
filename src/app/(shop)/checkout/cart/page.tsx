'use client'

import Image from 'next/legacy/image'
import { useContext, useState, useEffect } from 'react'

import { CartContext } from '@/context/provider/cart'
import Link from 'next/link'
import EmptyCart from '@/components/empty-cart'
import CartItemType from '@/types/type.cartItems'

const Cart = () => {
   const { cart, dispatch } = useContext(CartContext) as {
      cart: CartItemType
      // @ts-ignore
      dispatch
   }
   const [price, setPrice] = useState(0)
   const [discount, setDiscount] = useState<number>(0)

   useEffect(() => {
      document.title = 'تبریزیان ایکامرس | سبد خرید'
   }, [])

   useEffect(() => {
      setPrice(0), setDiscount(0)

      Object.values(cart).map((item) => {
         setPrice((prev) => prev + item.price * item.quantity)
         setDiscount((prev) => prev + ((item.price * item.discount) / 100) * item.quantity)
      })
   }, [cart])

   return (
      <div className='mx-4 md:mx-auto my-16 max-w-screen-md space-y-6'>
         <h1 className='text-center font-bold'>سبد خرید</h1>

         <div>
            {Object.keys(cart ?? {}).length ? (
               <div className='md:grid md:justify-end flex flex-col-reverse md:grid-cols-2'>
                  <div className='mx-10 mt-10 space-y-5'>
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
                              {(price - discount).toLocaleString()}
                           </span>
                        </div>
                        <span className='text-black font-semibold'>جمع سبد خرید</span>
                     </div>
                     {discount ? (
                        <div className='flex justify-between'>
                           <div className='flex space-x-1'>
                              <span className='text-red-500 font-semibold'>تومان</span>
                              <span className='text-red-500 font-semibold'>
                                 {discount.toLocaleString()} (%
                                 {Math.round((discount * 100) / (price - discount))})
                              </span>
                           </div>
                           <span className='text-red-500 font-semibold'>سود شما از خرید</span>
                        </div>
                     ) : (
                        ''
                     )}

                     <Link href='/checkout/payment' className='block'>
                        <div className='bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full py-3 text-center rounded-xl yekan1'>
                           <button>ثبت سفارش</button>
                        </div>
                     </Link>
                  </div>

                  <div className='space-y-3 mb-5'>
                     {Object.values(cart).map((item) => {
                        return (
                           <div
                              key={item.id}
                              className='flex md:px-10 items-center justify-evenly bg-white rounded-xl px-4 space-y-3'
                           >
                              <div className='mx-2 flex flex-col'>
                                 <div>
                                    {item?.thumbnail?.src ? (
                                       <Image
                                          className='object-contain'
                                          src={item.thumbnail.src}
                                          alt={item.thumbnail.alt}
                                          width='200'
                                          height='150'
                                       />
                                    ) : (
                                       'NoImage'
                                    )}
                                 </div>
                                 <div className='flex items-center mx-auto space-x-10'>
                                    <button
                                       onClick={() => {
                                          dispatch({
                                             type: 'REMOVE_FROM_CART',
                                             payload: { id: item.id },
                                          })
                                       }}
                                    >
                                       <svg
                                          className='h-7 w-7 text-black'
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
                                          <line x1='5' y1='12' x2='19' y2='12' />
                                       </svg>
                                    </button>
                                    <span className='text-black font-semibold text-base'>
                                       {item.quantity}
                                    </span>
                                    <button
                                       onClick={() => {
                                          if (item.quantity < item.maxQuantity) {
                                             dispatch({
                                                type: 'ADD_TO_CART',
                                                payload: { id: item.id },
                                             })
                                          }
                                       }}
                                    >
                                       <svg
                                          className='h-7 w-7 text-black'
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
                                          <line x1='12' y1='5' x2='12' y2='19' />{' '}
                                          <line x1='5' y1='12' x2='19' y2='12' />
                                       </svg>
                                    </button>
                                 </div>
                              </div>
                              <div className='space-y-3 rtl'>
                                 <h3>{item.title}</h3>
                                 <div className='-space-y-1'>
                                    {item.discount ? (
                                       <div className='flex space-x-reverse space-x-1'>
                                          <span className='text-red-400'>تخفیف</span>
                                          <span className='text-red-400 text-sm'>
                                             {(
                                                ((item.price * item.discount) / 100) *
                                                item.quantity
                                             ).toLocaleString()}
                                          </span>
                                       </div>
                                    ) : (
                                       ''
                                    )}
                                    <span
                                       style={{ fontSize: '1.7rem' }}
                                       className='text-black font-bold toman_product ltr'
                                    >
                                       {(
                                          (item.price - (item.price * item.discount) / 100) *
                                          item.quantity
                                       ).toLocaleString()}
                                    </span>
                                 </div>
                                 <div className='flex space-x-reverse space-x-5 items-center'>
                                    <div className='flex items-center space-x-reverse space-x-1'>
                                       <span
                                          style={{
                                             fontSize: '.8rem',
                                             color: 'black',
                                          }}
                                       >
                                          رنگ :
                                       </span>
                                       <span
                                          style={{ background: item.color }}
                                          className='block w-6 h-6 rounded-full shadow-[0_0_5px_#a4a4a4]'
                                       ></span>
                                    </div>
                                    <div className='flex items-center space-x-reverse space-x-1'>
                                       <span
                                          style={{
                                             fontSize: '.8rem',
                                             color: 'black',
                                          }}
                                       >
                                          سایز :
                                       </span>
                                       <span
                                          style={{
                                             fontSize: '1rem',
                                             color: 'black',
                                          }}
                                       >
                                          {item.size}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            ) : (
               <EmptyCart />
            )}
         </div>
      </div>
   )
}

export default Cart
