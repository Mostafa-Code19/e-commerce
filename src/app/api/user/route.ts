import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

type UserType = {
   name: string | null
   mobileNumber: string | null
   phoneNumber: string | null
   melliCode: string | null
   address: string | null
} | null

export async function GET() {
   const session: { email: string } | null = await getServerSession(authOptions)

   if (!session) return

   const user = await prisma.user
      .findUnique({
         where: {
            email: session.email,
         },
         select: {
            name: true,
            mobileNumber: true,
            phoneNumber: true,
            melliCode: true,
            address: true,
         },
      })
      .then((res: UserType) => res)

   return NextResponse.json(user)
}

export async function PATCH(request: Request) {
   const session: { email: string } | null = await getServerSession(authOptions)
   const payload = await request.json()

   if (!session) return

   try {
      const user: User | null = await prisma.user.update({
         where: {
            email: session.email,
         },
         data: payload,
      })

      const { password: _, ...filteredUser } = user

      return NextResponse.json(filteredUser)
   } catch (err) {
      console.log('err api/user', err)

      return NextResponse.json({
         statue: 500,
         undefined,
      })
   }
}
