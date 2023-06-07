'use client'

import { useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const QtyEdit = ({ id, quantity }) => {
    const qtyRef = useRef<HTMLInputElement>()

    const checkKey = (e) => {
        if (e.key == 'Enter') submit()
    }

    const submit = async () => {
        if (qtyRef?.current?.value == quantity) return

        const payload = {
            id: id,
            qty: qtyRef?.current?.value
        }

        await axios.patch('/api/product/location/update/qty', payload)
            .then(res => {
                if (res.status == 200) toast.success('تعداد با موفقیت تغییر یافت.')
            })
            .catch(err => {
                toast.error('در تغییر تعداد خطایی رخ داد!')
                console.log('qty submit err', err)
            })
    }

    return (
        <input ref={qtyRef} className='placeholder:text-black' min={0} placeholder={quantity} onKeyDown={checkKey} type="number" name="" id="" />
    );
}

export default QtyEdit;