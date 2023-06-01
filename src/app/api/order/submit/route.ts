import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const payload = await request.json()

    let cartItemsIdObject: {}[] = []
    let cartItemsId: string[] = []

    Object.keys(payload.cart).map((key) => {
        const item = payload.cart[key]
        cartItemsIdObject.push({ id: item.id })
        cartItemsId.push(item.id)
    })

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })
        .then((res: any) => {
            return res
        })

    const checkQuantity = await prisma.productLocation.findMany({
        where: {
            id: {
                in: cartItemsId
            }
        }
    })
        .then(res => res)
        .catch(err => console.log('checkQuantity', err))


    let notEnough: {type: string, id: null|string, quantity: number} = {type: 'lack', id: null, quantity: -1}

    checkQuantity?.map(item => {
        if (payload.cart[item.id].quantity > item.quantity) {
            notEnough['id'] = item.id
            notEnough['quantity'] = item.quantity
            return
        }
    })

    if (notEnough.id) return NextResponse.json(notEnough)

    checkQuantity?.map(async (item) => {
        await prisma.productLocation.update({
            where: { id: item.id },
            data: {
                quantity: item.quantity - payload.cart[item.id].quantity
            }
        })
    })

    const order = await prisma.order.create({
        data: {
            price: payload.price,
            discount: payload.discount || 0,
            payment: 'CASH',
            shipping_cost: 0,
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
