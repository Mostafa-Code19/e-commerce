import prisma from '../../../lib/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const products = await prisma.product.findMany()
        .then((res: any) => res)
        .catch((err: any) => console.log('err products api', err))

    return NextResponse.json(products);
}
