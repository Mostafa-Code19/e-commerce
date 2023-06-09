import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

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
        .then((res: any) => {
            return res
        })
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
