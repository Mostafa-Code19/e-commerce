import { Brand } from "@prisma/client";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const brand = await prisma.brand.findMany()
        .then((res: Brand[]) => {
            return res
        })
        .catch((err: AxiosError) => {
            console.log('brand fetch err', err)
        })

    return NextResponse.json(brand);
}