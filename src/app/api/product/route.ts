import { Product } from '@prisma/client'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET() {
   const products = await prisma.product
      .findMany()
      .then((res: Product[]) => res)
      .catch((err: Error) => console.log('err products api', err))

   return NextResponse.json(products)
}

export async function POST(request: Request) {
   const payload = await request.json()

   const product = await prisma.product
      .create({
         data: {
            title: payload.title,
            brandId: payload.brand,
            description: payload.description,
         },
      })
      .then((res: Product) => {
         return res
      })

   return NextResponse.json(product)
}

export async function PATCH(request: Request) {
   const session: { email: string; role: string } | null = await getServerSession(authOptions) // ! try lib
   const reqData = await request.json()

   //  @ts-ignore
   if (!session?.role == 'ADMIN') return

   try {
      const product: Product | null = await prisma.product.update({
         where: {
            id: reqData.id,
         },
         data: reqData.data,
      })

      return NextResponse.json(product)
   } catch (err) {
      console.log('err api/product/update', err)
      NextResponse.error()
   }
}
