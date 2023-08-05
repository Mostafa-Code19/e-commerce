import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: Request) {
   const { imageId }: { imageId: string } = await request.json()

   await prisma.image.delete({
      where: {
         id: imageId,
      },
   })

   return NextResponse.json({ statue: 'success' })
}
