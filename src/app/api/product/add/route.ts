import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = await request.json()

    const product = await prisma.product.create({
        data: {
            title: payload.title,
            description: payload.description,
        }
    })
        .then((res: Product) => {
            return res
        })

    return NextResponse.json(product);
}
