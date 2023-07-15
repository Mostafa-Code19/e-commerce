import { ProductLocation } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const payload = await request.json()

    const location = await prisma.productLocation.update({
        where: {
            id: payload.id
        },
        data: {
            public: {
                set: payload.public
            }
        }
    })
        .then((res: ProductLocation) => {
            return res
        })
        
  return NextResponse.json(location);
}
