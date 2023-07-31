import prisma from '@/lib/prisma';
import { hashSync, genSaltSync } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   try {
      const { email, password } = (await req.json()) as {
         email: string;
         password: string;
      };

      const hashed_password = hashSync(password, genSaltSync(10));

      const user = await prisma.user.create({
         data: {
            email: email.toLowerCase(),
            password: hashed_password,
         },
      });

      return NextResponse.json({
         user: {
            email: user.email,
         },
      });
   } catch (error: any) {
      return NextResponse.json({ status: 500, message: error.message });
   }
}
