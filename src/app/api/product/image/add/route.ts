import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
   const payload: { productId: string; imageSources: [] } =
      await request.json();

   payload.imageSources.map(async (imageName: string) => {
      await prisma.image.create({
         data: {
            productId: payload.productId,
            src: '/product/' + imageName,
            alt: imageName,
         },
      });
   });

   return NextResponse.json({ statue: 'success' });
}
