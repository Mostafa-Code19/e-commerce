'use client'

import { useState } from 'react'
import Image from 'next/image'

import DateFormat from '@/components/dateFormat'
import OrderStatus from './orderStatus.component'
import { OrderExtended } from './page'
import TrackingCode from './trackingCode'

const Tabs = ({ orders }: { orders: OrderExtended[]}) => {
    const [activeTab, selectTab] = useState('PENDING')

    const activeTabStyle = 'border-b-4 border-blue-600'

    return (
        <>
            <div className='flex justify-around max-w-lg mx-auto'>
                <button onClick={() => selectTab('CANCELED')} className={activeTab == 'CANCELED' ? activeTabStyle : ''}>کنسل شده</button>
                <button onClick={() => selectTab('POSTED')} className={activeTab == 'POSTED' ? activeTabStyle : ''}>ارسال شده</button>
                <button onClick={() => selectTab('PREPARING')} className={activeTab == 'PREPARING' ? activeTabStyle : ''}>در حال آماده سازی</button>
                <button onClick={() => selectTab('PENDING')} className={activeTab == 'PENDING' ? activeTabStyle : ''}>ثبت اولیه</button>
            </div>

            <div className='md:flex flex-wrap gap-5'>
                {
                    orders?.length ?
                        orders.reverse().map((order) => {
                            if (order.status !== activeTab) return

                            return (
                                <div key={order.id} className='px-4 py-6 space-y-2 bg-zinc-100 rounded-xl max-w-lg mx-auto'>

                                    <div className='text-right flex'>

                                        <div>
                                            <OrderStatus order={order}/>
                                        </div>

                                        <div className='space-y-2'>

                                            <div className='flex  justify-end space-x-2'>
                                                <span className='text-black font-semibold'>{DateFormat(order.created_at)}</span>
                                                <span>:تاریخ ثبت</span>
                                            </div>

                                            <div className='space-x-2'>
                                                <span className='text-black font-semibold'>{order.id}</span>
                                                <span>:کد سفارش</span>
                                            </div>

                                            <div className='space-x-2'>
                                                <span className='text-black font-semibold'>{order.client.mobile_number} __ {order.client.phone_number}</span>
                                                <span>:سفارش دهنده</span>
                                            </div>

                                            <TrackingCode orderId={order.id} availableTrackingCode={order.tracking_code} />

                                            <div className='space-x-2 flex justify-end'>
                                                <span className='text-black font-semibold toman_card'>{(order.price).toLocaleString()}</span>
                                                <span>مبلغ</span>
                                            </div>

                                            {
                                                order.discount ?
                                                    <div className='space-x-2 flex justify-end'>
                                                        <span className='text-black font-semibold toman_card'>{(order.discount).toLocaleString()}</span>
                                                        <span>تخفیف</span>
                                                    </div>
                                                    : ''
                                            }
                                        </div>

                                    </div>

                                    <hr className='my-2' />

                                    <span>آیتم های خریداری شده:</span>

                                    <div className='flex space-x-3 justify-end'>
                                        {
                                            order.items.map((item: any) => {
                                                return (
                                                    <div key={item.item.id} className='relative w-fit'>
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
                                                                <span>{item.item.size.size}</span>
                                                            </div>

                                                            <div className='flex items-center'>
                                                                <span style={{ background: item.item.color.color }} className='w-3 h-3 block rounded-full'></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div>
                            <h2 className='text-center'>!شما تا به این لحظه هیچ سفارشی ثبت نکرده اید</h2>
                            <svg className="h-16 w-16 text-black mx-auto mt-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                        </div>
                }
            </div>
        </>
    );
}
 
export default Tabs;