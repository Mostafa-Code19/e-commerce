import BackButton from '@/components/back-btn'
import Tabs from './tabs.components'
import { Order, User } from '@prisma/client'

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
   title: 'تبریزیان ایکامرس | پنل ادمین | سفارشات',
}

const OrdersManagement = () => {
   return (
      <div className='mx-6 my-16 space-y-10'>
         <div className='flex justify-between items-center'>
            <BackButton />
            <h1>پنل ادمین | سفارشات</h1>
            <span></span>
         </div>

         <Tabs />
      </div>
   )
}

export default OrdersManagement
