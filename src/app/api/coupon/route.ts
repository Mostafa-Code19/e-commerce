import prisma from '../../../lib/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const couponCode = searchParams.get('c')

    const coupon = await prisma.coupon.findUnique({
        where: {
            code: couponCode
        },
        select: {
            type: true,
            value: true
        }
    })
        .then((res: any) => res)
        .catch((err: any) => console.log('err coupon api'))

    return NextResponse.json(coupon);
}
