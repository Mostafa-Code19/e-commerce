import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma";

type UserType = {
    name: string | null;
    mobile_number: string | null;
    phone_number: string | null;
    melli_code: string | null;
    address: string | null
} | null

export async function GET() {
    const session: {email: string} | null = await getServerSession(authOptions);

    if (!session) return

    const user = await prisma.user.findUnique({
        where: {
            email: session.email
        },
        select: {
            name: true,
            mobile_number: true,
            phone_number: true,
            melli_code: true,
            address: true,
        }
    })
        .then((res: UserType) => res)
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
