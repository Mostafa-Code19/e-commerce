import BackButton from "@/components/back-btn";
import isAdmin from "@/lib/isAdmin";
import Tabs from "./tabs.components";
import prisma from '@/lib/prisma'

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

async function getOrders() {
    return await prisma.order.findMany({
        include: {
            client: true,
            items: {
                include: {
                    item: {
                        include: {
                            product: {
                                include: {
                                    gallery: true
                                }
                            },
                            color: true,
                            size: true
                        }
                    }
                }
            }
        }
    })
        .then((res: OrderExtended[]) => res)
}

export const metadata = {
    title: 'فروشگاه اینترنتی | پنل ادمین | سفارشات'
}

const OrdersManagement = async () => {
    const orders = await getOrders()

    return (
        <div className='mx-8 my-16 space-y-10'>
            {
                (await isAdmin()) ?
                <>
                    <div className='flex justify-between items-center'>
                        <BackButton />
                        <h1>پنل ادمین | سفارشات</h1>
                        <span></span>
                    </div>

                    <Tabs orders={orders} />
                </>
                :
                <h1 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h1>
            }
        </div>

    );
}
 
export default OrdersManagement;