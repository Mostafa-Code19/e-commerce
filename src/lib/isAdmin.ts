import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma";

const isAdmin = async () => {
    const session: {email: string} | null = await getServerSession(authOptions);

    if (!session) return null

    const userRole = await prisma.user.findUnique({
        where: {
            email: session.email
        },
        select: {
            role: true
        }
    })
        .then((user) => {
            return user?.role
        })

    return userRole === 'ADMIN' ? true : false
};

export default isAdmin;