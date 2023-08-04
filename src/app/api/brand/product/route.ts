import { Product } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Brand = { products: Product[] } | null

export async function POST(request: Request) {
   const payload: { name: string } = await request.json()
   const products = await prisma.brand
      .findFirst({
         where: {
            name: {
               equals: payload.name,
               mode: 'insensitive',
            },
         },
         select: {
            products: {
               include: {
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
            },
         },
      })
      .then((res: Brand) => res)
      .catch((err: Error) => console.error('err products api', err))

   return NextResponse.json(products)
}
