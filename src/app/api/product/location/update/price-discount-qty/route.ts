import { ProductLocation } from '@prisma/client';
import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
   const payload = await request.json();

   let price, discount, qty;

   if (payload.price) price = parseInt(payload.price);
   if (payload.discount) discount = parseInt(payload.discount);
   if (payload.qty) qty = parseInt(payload.qty);

   const location = await prisma.productLocation
      .update({
         where: {
            id: payload.id,
         },
         data: {
            price: price,
            discount: discount,
            quantity: qty,
         },
      })
      .then((res: ProductLocation) => {
         return res;
      });

   return NextResponse.json(location);
}
