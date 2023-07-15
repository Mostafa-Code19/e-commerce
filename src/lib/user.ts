import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { User } from "@prisma/client";

const User = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return null

    const email: string = String(session.user?.email)

    return await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            orders: {
                include: {
                    items: {
                        select: {
                            quantity: true,
                            product: {
                                select: {
                                    gallery: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
        .then((res: User | null) => {
            return res
        })
}

export default User