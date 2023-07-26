import CartItemType from '@/types/type.cartItems';
import { CartContext } from "@/context/provider/cart";

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useMemo, useState } from 'react'
import { signIn } from "next-auth/react";

const SubmitOrder = ({
    discountPrice,
    paymentPrice
}: {
    discountPrice: number,
    paymentPrice: number
}) => {
    const { cart, dispatch }: any = useContext(CartContext as any)
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const cartItems: CartItemType = useMemo(() => {
        return cart;
     }, [cart]);

    const submit = async () => {
        setLoading(true)

        const payload = {
            cart: cartItems,
            discount: discountPrice,
            price: paymentPrice
        };

        try {
            const res = await axios.post('/api/order', payload)
            
            if (res.status == 200) {
                const { id, message } = res.data;
                if (message == 'unAuthorized') toast.warning(<button onClick={() => signIn()}>ابتدا می‌بایست وارد شوید! برای ورود کلیک کنید</button>, { autoClose: 10000 });
                else if (message == 'userNotFound') toast.error('در دریافت اطلاعات کاربر خطایی رخ داد!');
                else if (message == 'incompleteProfile') toast.warning(<Link href='/profile/edit'>برای ثبت نهایی سفارش می‌بایست اطلاعات پروفایل خود را کامل کنید. برای ورود کلیک کنید</Link>, { autoClose: 10000 });
                else if (message == 'qtyNotEnough') toast.error(`تعداد موجودی "${cartItems[res.data.id].title}" ${cartItems[res.data.id].quantity} عدد است. لطفا پس از تغییر سبد خرید خود مجدد تلاش کنید.`);
                else if (id) {
                    dispatch({ type: "RESET" });
                    router.push(`/checkout/payment/success?id=${res.data.id}`);
                }
            } else {
                console.log('order/submit post error', res)
            }
        } catch ( err) {
            console.log('err submit order', err)
        }

        setLoading(false)
    }

    return (
        <div className='bg-blue-500 text-white w-full py-3 text-center rounded-xl yekan1'>
        {
            loading ?
                <svg aria-hidden="true" className="w-8 h-10 mx-auto text-gray-200 animate-spin dark:text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                :
                <button
                    className='w-full'
                    disabled={loading}
                    onClick={submit}
                >
                    پرداخت
                </button>
        }
        </div>
    );
}
 
export default SubmitOrder;