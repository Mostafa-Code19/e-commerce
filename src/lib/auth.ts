import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'

import { User as UserType } from '@prisma/client'
import prisma from './prisma'

interface Credential {
   email: string
   password: string
}

const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,

   providers: [
      CredentialsProvider({
         name: 'Credentials',

         credentials: {
            email: {
               label: 'ایمیل',
               type: 'text',
               placeholder: 'example@gmail.com',
            },
            password: {
               label: 'رمز عبور',
               type: 'password',
               placeholder: '1234',
            },
         },

         async authorize(credentials: Credential | undefined) {
            if (!credentials) return null

            const { email, password } = credentials

            const user = await prisma.user.findUnique({
               where: {
                  email: email,
               },
            })

            if (!user) return null

            const passwordsMatch = bcrypt.compareSync(password, user.password)

            if (!passwordsMatch) return null

            const { password: _, ...filteredUser } = user as UserType & {
               password: string
            }

            return filteredUser
         },
      }),
   ],
   callbacks: {
      // @ts-ignore
      async jwt({ token, user }) {
         return { ...token, ...user }
      },
      // @ts-ignore
      async session({ session, token }) {
         session.user = token

         delete token.password
         delete token.iat
         delete token.exp
         delete token.jti

         return token
      },
   },
   pages: {
      signIn: '/auth/login'
   }
}

export default authOptions
