import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

export async function PATCH(request: Request) {
    const session: {user: {email: string}}| null = await getServerSession(authOptions);
    const payload = await request.json()

    if (!session) return

    const user = await prisma.user.update({
        where: {
            email: session.user.email
        },
        data: payload
    })
        .then((res: User) => {
            return res
        })
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
