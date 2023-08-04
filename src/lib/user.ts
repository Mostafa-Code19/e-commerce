import { getServerSession } from 'next-auth'
import { User as UserType } from '@prisma/client'

import authOptions from './auth'
import { prisma } from '@/lib/prisma'

const User = async () => {
   const session: { email: string } | null = await getServerSession(authOptions)

   if (!session) return null

   return await prisma.user
      .findUnique({
         where: {
            email: session.email,
         },
         include: {
            orders: {
               include: {
                  items: {
                     select: {
                        quantity: true,
                        item: {
                           include: {
                              product: {
                                 include: {
                                    gallery: true,
                                 },
                              },
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
                     },
                  },
               },
            },
         },
      })
      .then((user: UserType | null) => {
         const { password, ...filteredUser } = user as UserType & {
            password: string
         }
         return filteredUser
      })
}

export default User
