'use client'

import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { toast } from 'react-toastify'

import DateFormat from '@/components/dateFormat'
import OrderStatus from './orderStatus.component'
import TrackingCode from './trackingCode'
import fetcher from '@/lib/fetcher'
import { OrderExtended } from './page'

const Tabs = () => {
   const [activeTab, selectTab] = useState('PENDING')
   const { data: orders, error, isLoading, mutate } = useSWR('/api/order', fetcher)

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }

   const activeTabStyle = 'border-b-4 border-blue-600'

   return (
      <>
         <div className='flex justify-around max-w-lg mx-auto'>
            <button
               onClick={() => selectTab('CANCELED')}
               className={activeTab == 'CANCELED' ? activeTabStyle : ''}
            >
               کنسل شده
            </button>
            <button
               onClick={() => selectTab('POSTED')}
               className={activeTab == 'POSTED' ? activeTabStyle : ''}
            >
               ارسال شده
            </button>
            <button
               onClick={() => selectTab('PREPARING')}
               className={activeTab == 'PREPARING' ? activeTabStyle : ''}
            >
               در حال آماده سازی
            </button>
            <button
               onClick={() => selectTab('PENDING')}
               className={activeTab == 'PENDING' ? activeTabStyle : ''}
            >
               ثبت اولیه
            </button>
         </div>

         <div className='md:flex text-center flex-wrap gap-5'>
            {isLoading ? (
               <div>
                  <svg
                     aria-hidden='true'
                     className='w-12 h-12 mx-auto text-gray-200 animate-spin dark:text-white fill-blue-700'
                     viewBox='0 0 100 101'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                     />
                     <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                     />
                  </svg>
               </div>
            ) : (
               orders?.length &&
               orders.reverse().map((order: OrderExtended) => {
                  if (order.status !== activeTab) return

                  return (
                     <div
                        key={order.id}
                        className='px-4 py-6 space-y-2 bg-zinc-100 rounded-xl max-w-lg mx-auto'
                     >
                        <div className='text-right flex'>
                           <div>
                              <OrderStatus order={order} mutate={mutate} />
                           </div>

                           <div className='space-y-2'>
                              <div className='flex  justify-end space-x-2'>
                                 <span className='text-black font-semibold'>
                                    {DateFormat(order.createdAt)}
                                 </span>
                                 <span>:تاریخ ثبت</span>
                              </div>

                              <div className='space-x-2'>
                                 <span className='text-black font-semibold'>{order.id}</span>
                                 <span>:کد سفارش</span>
                              </div>

                              <div className='space-x-2'>
                                 <span className='text-black font-semibold'>
                                    {order.client.mobileNumber} __ {order.client.phoneNumber}
                                 </span>
                                 <span>:سفارش دهنده</span>
                              </div>

                              <TrackingCode
                                 orderId={order.id}
                                 availableTrackingCode={order.trackingCode}
                              />

                              <div className='space-x-2 flex justify-end'>
                                 <span className='text-black font-semibold toman_card'>
                                    {order.price.toLocaleString()}
                                 </span>
                                 <span>مبلغ</span>
                              </div>

                              {order.discount ? (
                                 <div className='space-x-2 flex justify-end'>
                                    <span className='text-black font-semibold toman_card'>
                                       {order.discount.toLocaleString()}
                                    </span>
                                    <span>تخفیف</span>
                                 </div>
                              ) : (
                                 ''
                              )}
                           </div>
                        </div>

                        <hr className='my-2' />

                        <span>آیتم های خریداری شده:</span>

                        <div className='flex space-x-3 justify-end'>
                           {order.items.map((item) => {
                              return (
                                 <div
                                    // @ts-ignore
                                    key={item.item.id}
                                    className='relative w-fit'
                                 >
                                    <Image
                                       className='object-contain'
                                       src={item.item.product.gallery[0].src}
                                       alt={item.item.product.gallery[0].alt}
                                       width='100'
                                       height='70'
                                    />

                                    <div className='flex justify-around'>
                                       <div className=''>
                                          <span>Q:</span>
                                          <span>{item.quantity}</span>
                                       </div>

                                       <div className=''>
                                          <span>S:</span>
                                          <span>
                                             {
                                                // @ts-ignore
                                                item.item.size.size
                                             }
                                          </span>
                                       </div>

                                       <div className='flex items-center'>
                                          <span
                                             style={{
                                                // @ts-ignore
                                                background: item.item.color.color,
                                             }}
                                             className='w-3 h-3 block rounded-full'
                                          ></span>
                                       </div>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  )
               })
            )}
         </div>
      </>
   )
}

export default Tabs
