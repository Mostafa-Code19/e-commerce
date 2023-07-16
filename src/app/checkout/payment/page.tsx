'use client'

import { useState, useContext, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackButton from "@/components/back-btn";
import { CartContext } from "@/context/provider/cart";
import EmptyCart from '@/components/empty-cart';

type Discount = {
    type: string
    value: number
} | null | false

const Payment = () => {
    const { state, dispatch }: any = useContext(CartContext as any)

    const [method, setMethod] = useState<string>('atTheDoor')
    const [paymentPrice, setPaymentPrice] = useState(0)
    const [discount, setDiscount] = useState<Discount>(null)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [finalPaymentPrice, setFinalPaymentPrice] = useState(0)

    const cartItems = useMemo(() => {
        return state.cart;
     }, [state]);

    const couponRef = useRef<HTMLInputElement>(null)

    const router = useRouter();

    useEffect(() => {
        setPaymentPrice(0)

        Object.keys(cartItems).map((key: string) => {
            const item = cartItems[key]
            setPaymentPrice((prev) => prev + ((item.price - ((item.price * item.discount) / 100)) * item.quantity))
        })
    }, [cartItems, router])

    useEffect(() => {
        let discountPrice = 0

        if (discount) {
            if (discount.type == 'PERCENTAGE') { discountPrice = ((discount.value * paymentPrice) / 100) }
            else if (discount.type == 'PRICE') { discountPrice = discount.value }
            else return
        }

        discountPrice = Math.round(discountPrice / 1000) * 1000
        setDiscountPrice(discountPrice)
        setFinalPaymentPrice(Math.round((paymentPrice - discountPrice) / 1000) * 1000)

    }, [paymentPrice, discount])

    const changeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethod((event.target as HTMLInputElement).value);
    }

    let checkPermission = true

    const couponCheck = async () => {
        if (couponRef.current !== null && checkPermission) {
            checkPermission = false
            const couponCode = couponRef.current.value

            await axios.get(`/api/coupon?c=${couponCode}`,)
                .then(res => {
                    if (res.data) {
                        setDiscount(res.data)
                        toast.success(`تخفیف با موفقیت به شما تعلق گرفت`);
                    }
                    else {
                        setDiscount(false)
                        toast.error(`کد تخفیف وارد شده منقضی یا نامعتبر می‌باشد`);
                    }
                    checkPermission = true
                })
                .catch(err => {
                    console.log('err couponCheck', err)
                    checkPermission = true
                    toast.error(`به مشکلی برخوردیم! لطفا مجدد تلاش کنید.`);
                })
        }
    }

    const submitOrder = async () => {
        const payload = {
            cart: cartItems,
            discount: discountPrice,
            price: finalPaymentPrice
        }

        await axios.post('/api/order/submit', payload)
            .then(res => {
                if (res.status == 200) {
                    if (res.data.type == 'lack') {
                        toast.error('یک یا تعدادی از محصولات موجود نمی‌باشند!')
                    }
                    else if (res.data.id) {
                        dispatch({ type: "RESET" })
                        router.push(`/checkout/payment/success?id=${res.data.id}`)
                    }
                }
            })
            .catch(err => console.log('err submit order', err))
    }

    return (
        <div className='mx-8 space-y-6'>
            {
                Object.keys(cartItems).length ?
                    <>
                        <div className='flex items-center justify-between'>
                            <BackButton />
                            <h1>پرداخت</h1>
                            <span></span>
                        </div>

                        <div className='bg-white rounded-xl py-8 px-6 space-y-6 text-right'>
                            <h3>انتخاب روش پرداخت</h3>

                            <form className='flex flex-col space-y-4 yekan1 rtl'>
                                <div className={`flex space-x-3 space-x-reverse text-slate-400`}>  {/* ${method=='internet'?'text-blue-400':'text-black'} */}
                                    <input disabled checked={method == 'internet'} onChange={changeMethod} type='radio' id="methodInternet" name="methodOptions" value="internet" />
                                    <label htmlFor="methodInternet" className='flex space-x-3 space-x-reverse'>
                                        <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="3" />  <line x1="3" y1="10" x2="21" y2="10" />  <line x1="7" y1="15" x2="7.01" y2="15" />  <line x1="11" y1="15" x2="13" y2="15" /></svg>
                                        <div>
                                            پرداخت اینترنتی (غیرفعال)
                                        </div>
                                    </label>
                                </div>

                                <div className={`flex space-x-3 space-x-reverse ${method == 'atTheDoor' ? 'text-blue-400' : 'text-black'}`}>
                                    <input checked={method == 'atTheDoor'} onChange={changeMethod} type='radio' id="methodAtTheDoor" name="methodOptions" value="atTheDoor" />
                                    <label htmlFor="methodAtTheDoor" className='flex space-x-3 space-x-reverse'>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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

                            {
                                discount === false &&
                                <div className='text-center mt-5'>
                                    <span className='text-red-700'>کد تخفیف وارد شده منقضی یا نامعتبر می‌باشد</span>
                                </div>
                            }
                        </div>

                        <div className='bg-white rounded-xl py-8 px-6 space-y-6 text-right'>
                            <h3>خلاصه سفارش</h3>
                            <div className='space-x-5'>
                                <div className='flex justify-end'>
                                    {

                                        Object.keys(cartItems).map((key) => {
                                            const item = cartItems[key]

                                            return (
                                                <div key={item.id} className='space-y-3'>
                                                    <div className='relative'>
                                                        <Image
                                                            className='object-cover justify-center m-auto p-2'
                                                            src={item.thumbnail.src}
                                                            alt={item.thumbnail.src}
                                                            width='100'
                                                            height='100'
                                                        />

                                                        <span style={{ fontSize: '.6rem' }} className='absolute left-0 bottom-0 p-1 px-2 bg-slate-200 rounded-md text-black'>
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
                                    {finalPaymentPrice.toLocaleString()}
                                </span>
                                <span>
                                    :جمع سبد خرید
                                </span>
                            </div>
                        </div>

                        <button onClick={submitOrder} className='bg-blue-500 text-white w-full py-3 rounded-xl yekan1'>
                            پرداخت
                        </button>
                    </>
                    :
                    <EmptyCart />
            }
        </div>
    );
}

export default Payment;