'use client'

import { useState, useContext, useEffect, useRef } from 'react'
import Image from 'next/image'

import BackButton from "@/components/back-btn";
import { CartContext } from "@/context/provider/cart";
import axios from 'axios';

type Discount = {
    type: string
    value: number
} | null

const Payment = () => {
    const [method, setMethod] = useState<string>('internet')
    const { state }: any = useContext(CartContext as any)
    const { cart } = state
    const [paymentPrice, setPaymentPrice] = useState(0)
    const [discount, setDiscount] = useState<Discount>(null)
    const [discountPrice, setDiscountPrice] = useState<number>(null)
    const [finalPaymentPrice, setFinalPaymentPrice] = useState(0)

    const couponRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setPaymentPrice(0)

        Object.keys(cart).map((item: any) => {
            item = cart[item]
            setPaymentPrice((prev) => prev + ((item.price - ((item.price * item.discount) / 100)) * item.quantity))
        })
    }, [cart])

    useEffect(() => {
        let discountPrice = 0

        if (discount) {
            if (discount.type == 'PERCENTAGE') { discountPrice = ((discount.value * paymentPrice) / 100) }
            else if (discount.type == 'PRICE') { discountPrice = discount.value }
            else return
        }

        discountPrice = Math.round(discountPrice / 1000) *  1000
        setDiscountPrice(discountPrice)
        setFinalPaymentPrice(Math.round((paymentPrice - discountPrice) / 1000) * 1000)

    }, [paymentPrice, discount])

    const changeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethod((event.target as HTMLInputElement).value);
    }

    const couponCheck = async () => {
        if (couponRef.current !== null) {
            const couponCode = couponRef.current.value

            await axios.get(`/api/coupon?c=${couponCode}`,)
                .then(res => setDiscount(res.data))
                .catch(err => console.log('err couponCheck'))
        }
    }

    return (
        <div className='mx-8 space-y-6'>
            <div className='flex items-center justify-between'>
                <BackButton />
                <h1>پرداخت</h1>
                <span></span>
            </div>
            
            <div className='bg-white rounded-xl py-8 px-6 space-y-6 text-right'>
                <h3>انتخاب روش پرداخت</h3>

                <form className='flex flex-col space-y-4 yekan1 rtl'>
                    <div className={`flex space-x-3 space-x-reverse ${method=='internet'?'text-blue-400':'text-black'}`}>
                        <input checked={method == 'internet'} onChange={changeMethod} type='radio' id="methodInternet" name="methodOptions" value="internet" />
                        <label htmlFor="methodInternet" className='flex space-x-3 space-x-reverse'>
                            <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="3" />  <line x1="3" y1="10" x2="21" y2="10" />  <line x1="7" y1="15" x2="7.01" y2="15" />  <line x1="11" y1="15" x2="13" y2="15" /></svg>
                            <div>
                                پرداخت اینترنتی
                            </div>
                        </label>
                    </div>

                    <div className={`flex space-x-3 space-x-reverse ${method=='atTheDoor'?'text-blue-400':'text-black'}`}>
                        <input checked={method == 'atTheDoor'} onChange={changeMethod} type='radio' id="methodAtTheDoor" name="methodOptions" value="atTheDoor" />
                        <label htmlFor="methodAtTheDoor" className='flex space-x-3 space-x-reverse'>
                            <svg className="h-6 w-6"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                            </svg>
                            <div>
                                پرداخت درب منزل
                            </div>
                        </label>
                    </div>
                </form>
            </div>
            
            <div className='bg-white rounded-xl py-8 px-6'>
                <div className='flex justify-between items-center'>
                    <div className='border rounded-lg px-4 py-2 space-x-4'>
                        <button onClick={couponCheck}><span>ثبت</span></button>
                        <input ref={couponRef} type="text" className='text-right text-sm' placeholder='کد تخفیف' />
                    </div>
                    <h3>کد تخفیف</h3>
                </div>
                
                {
                    discount &&
                    <div className='text-center mt-5'>
                            <span className='text-green-700'>کد تخفیف با موفقیت اعمال شد: {discountPrice.toLocaleString()} تومان</span>
                    </div>
                }
            </div>

            <div className='bg-white rounded-xl py-8 px-6 space-y-6 text-right'>
                <h3>خلاصه سفارش</h3>
                <div className='space-x-5'>
                    <div className='flex justify-end'>
                        {

                            Object.keys(cart).map((key) => {
                                const item = cart[key]

                                return (
                                    <div key={item.id} className='space-y-3'>
                                        <div className='relative'>
                                            <Image
                                                className='object-cover justify-center m-auto p-2'
                                                src={`/product/${item.thumbnail}`}
                                                alt={item.title}
                                                width='100'
                                                height='100'
                                            />

                                            <span style={{ fontSize: '.6rem'}} className='absolute left-0 bottom-0 p-1 px-2 bg-slate-200 rounded-md text-black'>
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className='flex justify-center space-x-5 items-center'>
                                            <span style={{ fontSize: '.6rem', color: 'black' }}>{item.size}</span>
                                            <span style={{ background: item.color }} className='block w-3 h-3 rounded-full shadow-[0_0_5px_#a4a4a4]'></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='flex justify-end space-x-3'>
                    <span className='toman_card'>
                        { finalPaymentPrice.toLocaleString() }
                    </span>
                    <span>
                        :جمع سبد خرید
                    </span>
                </div>
            </div>

            <button className='bg-blue-500 text-white w-full py-3 rounded-xl yekan1'>
                پرداخت
            </button>
            
        </div>
    );
}
 
export default Payment;