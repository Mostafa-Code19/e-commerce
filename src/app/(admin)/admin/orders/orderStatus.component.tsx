'use client'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { OrderExtended } from './page'
import { toast } from 'react-toastify'

const OrderStatus = ({ order, mutate }: { order: OrderExtended; mutate: unknown }) => {
   const handleChangeStatus = async (event: SelectChangeEvent) => {
      const updatedStatus = event.target.value

      const payload = {
         id: order.id,
         updatedStatus: updatedStatus,
      }

      try {
         const res = await fetch('/api/order/status', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         // @ts-ignore
         mutate()
         toast.success('وضعیت با موفقیت تغییر یافت.')
      } catch (err) {
         toast.error('در تغییر وضعیت خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   return (
      <Select sx={{fontSize: '0.8rem'}} size='small' value={order.status} onChange={handleChangeStatus}>
         <MenuItem value='PENDING'>ثبت اولیه</MenuItem>
         <MenuItem value='PREPARING'>در حال آماده سازی</MenuItem>
         <MenuItem value='POSTED'>ارسال شده</MenuItem>
         <MenuItem value='CANCELED'>کنسل شده</MenuItem>
      </Select>
   )
}

export default OrderStatus
