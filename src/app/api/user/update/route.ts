import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import authOptions from '@/lib/auth';
import { User } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
   const session: { email: string } | null = await getServerSession(
      authOptions,
   );
   const payload = await request.json();

   if (!session) return;

   try {
      const user: User | null = await prisma.user.update({
         where: {
            email: session.email,
         },
         data: payload,
      });

      return NextResponse.json({
         authenticated: !!session,
         user,
      });
   } catch (err) {
      console.log('err api/user/update', err);

      return NextResponse.json({
         statue: 500,
         undefined,
      });
   }
}
