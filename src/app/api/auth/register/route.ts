import { prisma } from '@/lib/prisma'
import { hashSync, genSaltSync } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   try {
      const { email, password } = (await req.json()) as {
         email: string
         password: string
      }

      const hashedPassword = hashSync(password, genSaltSync(10))

      const user = await prisma.user.create({
         data: {
            email: email.toLowerCase(),
            password: hashedPassword,
         },
      })

      return NextResponse.json({
         user: {
            email: user.email,
         },
      })
   } catch (error) {
      // @ts-ignore
      return NextResponse.json({ status: 500, message: error.message })
   }
}
