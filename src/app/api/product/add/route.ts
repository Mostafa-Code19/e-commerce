import { Product } from '@prisma/client';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   const payload = await request.json();

   const product = await prisma.product
      .create({
         data: {
            title: payload.title,
            brandId: payload.brand,
            description: payload.description,
         },
      })
      .then((res: Product) => {
         return res;
      });

   return NextResponse.json(product);
}
