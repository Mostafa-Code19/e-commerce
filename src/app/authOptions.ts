import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../lib/prisma";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: <string>process.env.GOOGLE_CLIENT_ID,
            clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session: {
     strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session({ session, token }) {
         console.log('authoption')
         console.log(session)
         console.log(token)
          return session
        }
    }
}

export default authOptions