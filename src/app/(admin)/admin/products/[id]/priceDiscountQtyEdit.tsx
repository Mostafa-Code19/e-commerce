'use client'

import { useRef } from 'react'
import { toast } from 'react-toastify'

type PropsType = {
   id: string
   price: string
   discount: string
   quantity: string
}

const PriceDiscountQtyEdit = ({ id, price, discount, quantity }: PropsType) => {
   const qtyRef = useRef<HTMLInputElement>(null)
   const priceRef = useRef<HTMLInputElement>(null)
   const discountRef = useRef<HTMLInputElement>(null)

   const checkKey = (e: { key: string }) => {
      if (e.key == 'Enter') submit()
   }

   const submit = async () => {
      if (
         priceRef?.current?.value == price &&
         discountRef?.current?.value == discount &&
         qtyRef?.current?.value == quantity
      )
         return

      const payload = {
         id: id,
         price: priceRef?.current?.value,
         discount: discountRef?.current?.value,
         qty: qtyRef?.current?.value,
      }

      try {
         const res = await fetch('/api/product/location/price-discount-qty', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('قیمت، تخفیف و تعداد با موفقیت تغییر یافت.')
      } catch (err) {
         toast.error('در قیمت، تخفیف و تعداد تعداد خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <input
            ref={priceRef}
            className='placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm'
            min={0}
            placeholder={price.toLocaleString()}
            onKeyDown={checkKey}
            type='number'
            name='priceInput'
            id='priceInput'
         />
         <input
            ref={discountRef}
            className='placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm'
            min={0}
            max={100}
            placeholder={`${discount}%`}
            onKeyDown={checkKey}
            type='number'
            name='discountInput'
            id='discountInput'
         />
         <input
            ref={qtyRef}
            className='placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm'
            min={0}
            placeholder={quantity}
            onKeyDown={checkKey}
            type='number'
            name='qtyInput'
            id='qtyInput'
         />
      </>
   )
}

export default PriceDiscountQtyEdit
