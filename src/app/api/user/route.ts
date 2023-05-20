import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findMany({
        where: {
            email: session.email
        }
    })
        .then((res: any) => {
            return res[0]
        })
        
  return NextResponse.json({
    authenticated: !!session,
    user,
  });
}
