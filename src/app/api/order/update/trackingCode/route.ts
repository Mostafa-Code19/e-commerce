import { NextResponse } from "next/server";

import { Order } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
    const payload = await request.json()

    try {
        const order: Order = await prisma.order.update({
            where: {
                id: payload.id
            },
            data: {
                tracking_code: payload.trackingCode
            }
        })
        
        console.log('res api/order/update/trackingCode', order)
        
        return NextResponse.json({
            order,
        });
    } catch (err) {
        console.log('err api/order/update/trackingCode', err)

        return NextResponse.json({
            statue: 500,
            undefined
        });
    }
}
