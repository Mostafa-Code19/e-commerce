import { NextResponse } from 'next/server'

import { Order } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request) {
   const payload = await request.json()

   try {
      const order: Order = await prisma.order.update({
         where: {
            id: payload.id,
         },
         data: {
            trackingCode: payload.trackingCode,
         },
      })

      console.log('res api/order/trackingCode', order)

      return NextResponse.json({
         order,
      })
   } catch (err) {
      console.log('err api/order/trackingCode', err)

      return NextResponse.json({
         statue: 500,
         undefined,
      })
   }
}
