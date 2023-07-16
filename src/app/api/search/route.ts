import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload: {title: string} = await request.json()

    console.log(payload.title)

    const searchResult = await prisma.product.findMany({
        where: {
            title: {
                contains: payload.title,
                mode: 'insensitive',
            }
        },
        include: {
            productLocation: {
                where: {
                    public: {
                        equals: true
                    },
                    quantity: {
                        gt: 0
                    }
                },
                include: {
                    color: {
                        select: {
                            color: true
                        }
                    },
                    size: {
                        select: {
                            size: true
                        }
                    },
                }
            },
            gallery: {
                select: {
                    src: true,
                    alt: true
                }
            }
        }
    })
        .then((res: Product[]) => res)
        .catch((err: Error) => console.log('err products api', err))

    return NextResponse.json(searchResult);
}
