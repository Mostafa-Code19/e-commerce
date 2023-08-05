import User from '@/lib/user'
import Image from 'next/legacy/image'

import { User as UserType, Order } from '@prisma/client'
import DateFormat from '@/components/dateFormat'

type UserAndOrders = UserType & { orders?: OrderAndItems[] }
type UserWithoutPasswordAndOrders = Omit<UserAndOrders, 'password'>
type OrderAndItems = Order & {
   items: {
      id: string
      item: {
         product: {
            gallery: {
               src: string
               alt: string
            }[]
         }
      }
      quantity: number
   }[]
}

export const metadata = {
   title: 'تبریزیان ایکامرس | سفارش های من',
}

const Orders = async () => {
   const user: UserWithoutPasswordAndOrders | null = await User()

   const status = (status: string) => {
      if (status == 'CANCELED') return '❌ لغو شده '
      if (status == 'POSTED') return '✅ ارسال شده'
      if (status == 'PREPARING') return '📦 در حال آماده سازی'
      if (status == 'PENDING') return '🛎️ در حال پردازش'
   }

   return (
      <div className='mx-6 my-16 space-y-7'>
         <h1 className='text-center font-bold'>سفارش های من</h1>

         {user?.orders?.length ? (
            user.orders.reverse().map((order) => {
               return (
                  <div
                     key={order.id}
                     className='px-4 space-y-2 pb-3 from-gray-100 to-gray-200 bg-gradient-to-b rounded-lg max-w-md mx-auto'
                  >
                     <div className='text-right'>
                        <span>{status(order.status)}</span>
                     </div>
                     <div className='text-right space-y-2'>
                        <div>
                           <span>{DateFormat(order.createdAt)}</span>
                        </div>
                        <div className='space-x-2'>
                           <span className='text-black font-semibold'>{order.id}</span>
                           <span>کد سفارش</span>
                        </div>
                        {order.trackingCode ? (
                           <div className='space-x-2'>
                              <span className='text-black font-semibold'>{order.trackingCode}</span>
                              <span>کد رهگیری پستی</span>
                           </div>
                        ) : (
                           ''
                        )}
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
                     <hr />
                     <div className='flex flex-wrap justify-end'>
                        {order.items.map((item: OrderAndItems['items'][0]) => {
                           return (
                              <div
                                 key={item.id}
                                 className='w-fit ml-3 mb-3 ring ring-white rounded-md
                              '
                              >
                                 <div className='relative p-1'>
                                    <Image
                                       className='object-contain'
                                       src={item.item.product.gallery[0].src}
                                       alt={item.item.product.gallery[0].alt}
                                       width='80'
                                       height='50'
                                    />

                                    <span
                                       style={{ fontSize: '.6rem' }}
                                       className='absolute left-0 top-0 p-1 px-2 bg-white rounded-sm text-black'
                                    >
                                       {item.quantity}
                                    </span>
                                 </div>

                                 <div className='flex justify-between px-2 items-center bg-white text-black'>
                                    <span
                                       style={{
                                          // @ts-ignore
                                          background: item.item.color.color,
                                       }}
                                       className='w-3 h-3 block rounded-full'
                                    ></span>
                                    <span>
                                       {
                                          // @ts-ignore
                                          item.item.size.size
                                       }
                                       :سایز
                                    </span>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  </div>
               )
            })
         ) : (
            <h3 className='text-center'>!شما تا به این لحظه هیچ سفارشی ثبت نکرده اید</h3>
         )}
      </div>
   )
}

export default Orders
