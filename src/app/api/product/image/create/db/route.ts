import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface BodyType {
   key: string;
   productId: string;
   imageName: string;
}

export async function POST(req: Request) {
   const { key, productId, imageName }: BodyType = await req.json();

   const res = await prisma.image.create({
      data: {
         productId: productId,
         src: 'https://tabrizian.storage.iran.liara.space/' + key,
         alt: imageName,
      },
   });


   return NextResponse.json({ res });
}
