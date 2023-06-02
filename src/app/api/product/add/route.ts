import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = await request.json()

    const product = await prisma.product.create({
        data: {
            title: payload.title,
            description: payload.description,
        }
    })
        .then((res: any) => {
            return res
        })

    return NextResponse.json(product);
}
