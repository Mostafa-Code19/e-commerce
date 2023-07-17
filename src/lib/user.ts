import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { User as UserType } from "@prisma/client";

const User = async () => {
    const session: {email: string} | null = await getServerSession(authOptions);

    if (!session) return null

    return await prisma.user.findUnique({
        where: {
            email: session.email
        },
        include: {
            orders: {
                include: {
                    items: {
                        select: {
                            quantity: true,
                            item: {
                                include: {
                                    product: {
                                        include: {
                                            gallery: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
        .then((user: UserType | null) => {
            const { password, ...filteredUser } = user as UserType & { password: string };
            return filteredUser
        })
}

export default User