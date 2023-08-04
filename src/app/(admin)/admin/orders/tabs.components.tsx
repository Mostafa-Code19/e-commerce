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
import CircularProgress from '@mui/material/CircularProgress'

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
                  <CircularProgress size={40} />
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
