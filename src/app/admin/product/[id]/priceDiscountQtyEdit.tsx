'use client'

import { useRef } from 'react'
import axios from 'axios'
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

    const checkKey = (e) => {
        if (e.key == 'Enter') submit()
    }

    const submit = async () => {
        if (
            priceRef?.current?.value == price &&
            discountRef?.current?.value == discount &&
            qtyRef?.current?.value == quantity
        ) return

        const payload = {
            id: id,
            price: priceRef?.current?.value,
            discount: discountRef?.current?.value,
            qty: qtyRef?.current?.value
        }

        await axios.patch('/api/product/location/update/price-discount-qty', payload)
            .then(res => {
                if (res.status == 200) toast.success('قیمت، تخفیف و تعداد با موفقیت تغییر یافت.')
            })
            .catch(err => {
                toast.error('در قیمت، تخفیف و تعداد تعداد خطایی رخ داد!')
                console.log('qty submit err', err)
            })
    }

    return (
        <>
            <input ref={priceRef} className='placeholder:text-black' min={0} placeholder={price.toLocaleString()} onKeyDown={checkKey} type="number" name="priceInput" id="priceInput" />
            <input ref={discountRef} className='placeholder:text-black' min={0} max={100} placeholder={`${discount}%`} onKeyDown={checkKey} type="number" name="discountInput" id="discountInput" />
            <input ref={qtyRef} className='placeholder:text-black' min={0} placeholder={quantity} onKeyDown={checkKey} type="number" name="qtyInput" id="qtyInput" />
        </>
    );
}

export default PriceDiscountQtyEdit;