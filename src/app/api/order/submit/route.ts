import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Order, User, ProductLocation } from "@prisma/client";

type QuantityType = {id: string, quantity: number}

export async function POST(request: Request) {
    const session: {user: {email: string}}| null = await getServerSession(authOptions);
    const payload = await request.json()

    let cartItemsId: string[] = []

    Object.keys(payload.cart).map((key) => {
        const item = payload.cart[key]
        cartItemsId.push(item.id)
    })

    if (!session) return NextResponse.json({'message': 'unAuthorized', 'status': 401})

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
        .then((res: User | null) => {
            return res
        })

    const checkQuantity = await prisma.productLocation.findMany({
        where: {
            id: {
                in: cartItemsId
            }
        }
    })
        .then((res: ProductLocation[]) => res)
        .catch((err: Error) => console.log('checkQuantity', err))


    let notEnough: {type: string, id: null|string, quantity: number} = {type: 'lack', id: null, quantity: -1}

    checkQuantity?.map((item: QuantityType) => {
        if (payload.cart[item.id].quantity > item.quantity) {
            notEnough['id'] = item.id
            notEnough['quantity'] = item.quantity
            return
        }
    })

    if (notEnough.id) return NextResponse.json(notEnough)

    checkQuantity?.map(async (item: QuantityType) => {
        await prisma.productLocation.update({
            where: { id: item.id },
            data: {
                quantity: item.quantity - payload.cart[item.id].quantity
            }
        })
    })

    if (!user) {
        return NextResponse.json({'message': 'user not found', 'status': 401})
    }

    const order = await prisma.order.create({
        data: {
            price: payload.price,
            discount: payload.discount,  // coupon
            payment: 'CASH',
            shipping_cost: 0,
            client_id: user.id
        }
    })
        .then((res: Order) => {
            return res
        })

    Object.keys(payload.cart).map(async (key) => {
        const item = payload.cart[key]

        await prisma.orderItem.create({
            data: {
                order_id: order.id,
                item_id: item.id,
                price: item.price,
                discount: item.discount,
                quantity: item.quantity
            }
        })
            .catch(err => {
                NextResponse.json({'message': err.response, 'statue': 500})
            })
    })

    return NextResponse.json(order);
}
