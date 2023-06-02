import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const User = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return null

    const email: string = String(session.user?.email)

    return await prisma.user.findMany({
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
        .then((res: any) => {
            return res[0]
        })
}

export default User