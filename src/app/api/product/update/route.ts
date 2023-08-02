import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import authOptions from '@/lib/auth';
import { Product } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
    const session: { email: string, role: string } | null = await getServerSession(
        authOptions,
    );
    const reqData = await request.json();

    //  @ts-ignore
    if (!session?.role == 'ADMIN') return;

    try {
        const product: Product | null = await prisma.product.update({
            where: {
                id: reqData.id,
            },
            data: reqData.data,
        });

        return NextResponse.json({
            authenticated: !!session,
            product,
        });
    } catch (err) {
        console.log('err api/product/update', err);
        NextResponse.error()
    }
}
