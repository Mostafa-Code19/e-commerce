import { NextResponse } from "next/server";
import { NextApiResponse } from 'next'

import { Brand } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, res: NextApiResponse) {
    if (req.method !== 'PATCH') return res.status(405).end()

    const payload = await req.json()

    try {
        const brand: Brand = await prisma.brand.update({
            where: {
                id: payload.id
            },
            data: {
                name: payload.name
            }
        })

        return NextResponse.json({
            brand,
        });
    } catch (err) {
        console.log('err api/order/status/update', err)

        return NextResponse.json({
            statue: 500,
            message: err
        });
    } finally {
        await prisma.$disconnect()
    }
}
