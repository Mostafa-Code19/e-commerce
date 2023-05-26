import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    const payload = await request.json()

    let cartItemsIdObject:{}[] = []

    Object.keys(payload.cart).map((key) => {
        const item = payload.cart[key]
        cartItemsIdObject.push({id: item.id})
    })

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })
        .then((res: any) => {
            return res
        })


    const order = await prisma.order.create({
        data: {
            price: payload.price,
            discout: payload.discout || 0,
            payment: 'CASH',
            shipping_cost: 0,
            tracking_code: 'NULL',
            client_id: user.id
        }
    })
        .then((res: any) => {
            return res
        })

    const orderItems = await prisma.order.update({
        where: { id: order.id },
        data: {
            items: {
                set: cartItemsIdObject
            }
        }
    })
        
    return NextResponse.json(orderItems);
}
