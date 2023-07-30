import prisma from '@/lib/prisma'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()

    try {
        const { name } = await req.json()

        const checkIfExist = await prisma.brand.findFirst({
            where: {
                name: name
            }
        })

        if (checkIfExist) return NextResponse.json({ status: 405, message: 'Brand already exist' })

        const brand = await prisma.brand.create({
            data: {
                name: name
            }
        });

        return NextResponse.json(brand)
    } catch (error) {
        console.error('Error creating brand:', error);
        return NextResponse.json({ status: 500, message: error })
    } finally {
        await prisma.$disconnect()
    }
}