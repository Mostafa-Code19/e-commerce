import BackButton from "@/components/back-btn";
import User from "@/lib/user";
import Image from 'next/image'

const Orders = async () => {
    const user = await User()

    const status = (status: string) => {
        if (status == 'CANCELED') return '❌ لغو شده '
        if (status == 'POSTED') return '✅ ارسال شده'
        if (status == 'PREPARING') return '📦 در حال آماده سازی'
        if (status == 'PENDING') return '🛎️ در حال پردازش'
    }

    const toPersian = (fullDate: any) => {
        if (fullDate) {
            const persianDate = fullDate.toLocaleDateString('fa-IR').split('/')
    
            let monthsInPersian
    
            switch (persianDate[1]) {
                case '۱':
                    monthsInPersian = 'فروردين'
                    break;
                case '۲':
                    monthsInPersian = 'ارديبهشت'
                    break
                case '۳':
                    monthsInPersian = 'خرداد'
                    break
                case '۴':
                    monthsInPersian = 'تير'
                    break
                case '۵':
                    monthsInPersian = 'مرداد'
                    break
                case '۶':
                    monthsInPersian = 'شهريور'
                    break
                case '۷':
                    monthsInPersian = 'مهر'
                    break
                case '۸':
                    monthsInPersian = 'آبان'
                    break
                case '۹':
                    monthsInPersian = 'آذر'
                    break
                case '۱۰':
                    monthsInPersian = 'دي'
                    break
                case '۱۱':
                    monthsInPersian = 'بهمن'
                    break
                case '۱۲':
                    monthsInPersian = 'اسفند'
                    break
            }
    
            return <div className='flex space-x-1 justify-end'> <span>{persianDate[0]}</span> <span>{monthsInPersian}</span> <span>{persianDate[2]}</span> </div>
        }
    }

    return (
        <div className='mx-8 my-16 space-y-11'>
            <div className='flex justify-between items-center'>
                <BackButton />
                <h1 className='text-center font-bold'>سفارش های من</h1>
                <span></span>
            </div>

            {
                user.orders.map((order: any) => {
                    return (
                        <div key={order.id} className='px-4 py-10 space-y-2 bg-zinc-100 rounded-xl'>
                            <div className='text-right'>
                                <span>
                                    {status(order.status)}
                                </span>
                            </div>
                            <div className='text-right space-y-2'>
                                <div><span>{toPersian(order.created_at)}</span></div>
                                <div className='space-x-2'>
                                    <span className='text-black font-semibold'>{order.id}</span>
                                    <span>کد سفارش</span>
                                </div>
                                {
                                    order.tracking_code ?
                                    <div className='space-x-2'>
                                        <span className='text-black font-semibold'>{order.tracking_code}</span>
                                        <span>کد رهگیری پستی</span>
                                    </div>
                                    : ''
                                }
                                <div className='space-x-2 flex justify-end'>
                                    <span className='text-black font-semibold toman_card'>{(order.price).toLocaleString()}</span>
                                    <span>مبلغ</span>
                                </div>
                                {
                                    order.discount ?
                                    <div className='space-x-2 flex justify-end'>
                                        <span className='text-black font-semibold toman_card'>{(order.discount).toLocaleString()}</span>
                                        <span>تخفیف</span>
                                    </div>
                                    :''
                                }
                            </div>
                            <hr />
                            <div className='flex space-x-3 justify-end'>
                                {
                                    order.items.map((item: any) => {
                                        return (
                                            <div key={item.id} className='relative w-fit'>
                                                <Image
                                                    className='object-cover justify-center m-auto p-2'
                                                    src={item.color.gallery[0].src}
                                                    alt={item.color.gallery[0].alt}
                                                    width='100'
                                                    height='100'
                                                />

                                                <span style={{ fontSize: '.6rem'}} className='absolute left-0 bottom-0 p-1 px-2 bg-slate-200 rounded-md text-black'>
                                                    {item.quantity}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Orders;