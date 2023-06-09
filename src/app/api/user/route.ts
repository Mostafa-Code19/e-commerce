import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session: {user: {email: string}}| null = await getServerSession(authOptions);
    if (!session) return
    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        },
        select: {
            name: true,
            mobile_number: true,
            phone_number: true,
            melli_code: true,
            address: true,
        }
    })
        .then((res: any) => {
            return res
        })
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
