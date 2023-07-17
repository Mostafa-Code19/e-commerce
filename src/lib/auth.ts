import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from './prisma';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {label: 'ایمیل', type: 'text', placeholder: 'example@gmail.com'},
        password: { label: 'رمز عبور', type: 'password', placeholder: '1234'}
      },

      async authorize(credentials: { email: string, password: string}) {
        const { email, password } = credentials

        const user = await (async () => {
            return await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
        })()

        if (!user) return null

        // bcrypt.hashSync('password', bcrypt.genSaltSync(10))    // Encryption

        const passwordsMatch = bcrypt.compareSync(password, user?.password)

        if (!passwordsMatch) return null
        
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
        return { ...token, ...user };
    },
    async session({ session, token }: any) {
        session.user = token;

        delete token.password
        delete token.iat
        delete token.exp
        delete token.jti

        return token;
    },
  }
}

export default authOptions