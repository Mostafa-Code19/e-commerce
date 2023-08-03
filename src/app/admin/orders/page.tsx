'use client'

import BackButton from '@/components/back-btn'
import Tabs from './tabs.components'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { toast } from 'react-toastify'

import { Order, User } from '@prisma/client'
import LoadingOrders from './loading'

export type OrderExtended = Order & {
   client: User
   items: {
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
   title: 'فروشگاه اینترنتی | پنل ادمین | سفارشات',
}

const OrdersManagement = () => {
   const { data: orders, error, isLoading, mutate } = useSWR('/api/order', fetcher)

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }
   
   return (
      <>
         {isLoading ? (
            <LoadingOrders />
         ) : (
            <div className='mx-6 my-16 space-y-10'>
               <div className='flex justify-between items-center'>
                  <BackButton />
                  <h1>پنل ادمین | سفارشات</h1>
                  <span></span>
               </div>

               <Tabs orders={orders} mutate={mutate} />
            </div>
         )}
      </>
   )
}

export default OrdersManagement
