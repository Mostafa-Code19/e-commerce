import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
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
