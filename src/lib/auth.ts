import { NextAuthOptions } from "next-auth";
// import GoogleProvider from 'next-auth/providers/google'
// import Auth0Provider from "next-auth/providers/auth0";
import EmailProvider from "next-auth/providers/email";
// import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  }
}

export default authOptions