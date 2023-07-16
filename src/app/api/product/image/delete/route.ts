import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload: {imageId: string} = await request.json()

    await prisma.image.delete({
        where: {
            id: payload.imageId
        }
    })

    return NextResponse.json({statue: 'success'})
}