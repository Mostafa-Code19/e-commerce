import { Product } from '@prisma/client';
import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   const payload: { title: string } = await request.json();

   const searchResult = await prisma.product
      .findMany({
         where: {
            OR: [
               {
                  title: {
                     contains: payload.title,
                     mode: 'insensitive',
                  },
               },
               {
                  brand: {
                     name: {
                        contains: payload.title,
                        mode: 'insensitive',
                     },
                  },
               },
            ],
         },
         include: {
            brand: {
               select: {
                  name: true,
               },
            },
            productLocation: {
               where: {
                  public: {
                     equals: true,
                  },
                  quantity: {
                     gt: 0,
                  },
               },
               include: {
                  color: {
                     select: {
                        color: true,
                     },
                  },
                  size: {
                     select: {
                        size: true,
                     },
                  },
               },
            },
            gallery: {
               select: {
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res: Product[]) => res)
      .catch((err: Error) => console.log('err products api', err));

   return NextResponse.json(searchResult);
}
