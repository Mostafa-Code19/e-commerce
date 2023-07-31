import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type CouponType = {
   type: string;
   value: number;
} | null;

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const couponCode = searchParams.get('c');

   if (!couponCode) return console.log('err coupon api: couponCode undefined');

   const coupon = await prisma.coupon
      .findUnique({
         where: {
            code: couponCode,
         },
         select: {
            type: true,
            value: true,
         },
      })
      .then((res: CouponType) => res)
      .catch((err: Error) => console.log('err coupon api', err));

   return NextResponse.json(coupon);
}
