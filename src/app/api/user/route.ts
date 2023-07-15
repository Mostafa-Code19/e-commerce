import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

type UserType = {
    name: string | null;
    mobile_number: string | null;
    phone_number: string | null;
    melli_code: string | null;
    address: string | null
} | null

export async function GET() {
    const session: {user: {email: string}}| null = await getServerSession(authOptions);

    if (!session) return

    const user = await prisma.user.findUnique({
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
        .then((res: UserType) => {
            return res
        })
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
