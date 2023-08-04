import { prisma } from '@/lib/prisma'

import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const res = await prisma.brand.findMany()
      return NextResponse.json(res)
   } catch (err) {
      console.error('api/brand err:', err)
      return NextResponse.json(err)
   }
}

export async function POST(req: Request) {
   try {
      const { name } = await req.json()

      const checkIfExist = await prisma.brand.findFirst({
         where: {
            name: name,
         },
      })

      if (checkIfExist)
         return NextResponse.json({
            status: 405,
            message: 'Brand already exist',
         })

      const brand = await prisma.brand.create({
         data: {
            name: name,
         },
      })

      return NextResponse.json(brand)
   } catch (error) {
      console.error('Error creating brand:', error)
      return NextResponse.json({ status: 500, message: error })
   } finally {
      await prisma.$disconnect()
   }
}

export async function PATCH(req: Request) {
   const payload = await req.json()

   try {
      const brand = await prisma.brand.update({
         where: {
            id: payload.id,
         },
         data: {
            name: payload.name,
         },
      })

      return NextResponse.json({
         brand,
      })
   } catch (err) {
      console.error('err api/order/status/update', err)

      return NextResponse.json({
         statue: 500,
         message: err,
      })
   } finally {
      await prisma.$disconnect()
   }
}

export async function DELETE(req: Request) {
   try {
      const { id } = await req.json()

      const brand = await prisma.brand.delete({
         where: {
            id: id,
         },
      })

      return NextResponse.json(brand)
   } catch (error) {
      console.error('Error deleting brand:', error)
      return NextResponse.json({ status: 500, message: error })
   } finally {
      await prisma.$disconnect()
   }
}
