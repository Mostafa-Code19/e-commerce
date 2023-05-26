import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const User = async () => {
    const session = await getServerSession(authOptions);

    return await prisma.user.findMany({
        where: {
            email: session?.email
        },
        include: {
            orders: true
        }
    })
        .then((res: any) => {
            return res[0]
        })
}

export default User