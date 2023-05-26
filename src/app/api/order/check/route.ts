import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // const session = await getServerSession(authOptions);

    // const payload = await request.json()

    // let cartItemsId:string[] = []

    // Object.keys(payload.cart).map((key) => {
    //     const item = payload.cart[key]

    //     cartItemsId.push(item.id)
    // })


    // const cartProduct = await prisma.product.findMany({
    //     where: {
    //         id: {in: cartItemsId}
    //     }
    // })
    //     .then((res: any) => {
    //         return res
    //     })

    // const quantityCheck = Object.keys(payload.cart).map((key) => {
    //     const item = payload.cart[key]

    //     cartProduct[item.]
    
    // })
        
  return NextResponse.json(quantityCheck);
}
