import Tabs from './tabs.components'
import { Order, User } from '@prisma/client'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

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
      <div className='mx-6 md:mx-auto w-max-screen-md my-16 space-y-10'>
         <Breadcrumbs aria-label='breadcrumb'>
            <Link className='text-gray-400' href='/'>
               فروشگاه
            </Link>
            <Link className='text-gray-400' href='/admin'>
               ادمین
            </Link>
            <h5 className='font-semibold'>سفارشات</h5>
         </Breadcrumbs>

         <Tabs />
      </div>
   )
}

export default OrdersManagement
