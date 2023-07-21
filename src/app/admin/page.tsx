import Link from "next/link";
import Image from "next/legacy/image"

import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";

import { Product, ProductLocation } from '@prisma/client'
import ProductCards from "@/components/product/cards";

type ProductLocationExtended = ProductLocation & { color: { color: string }, size: { size: number } }
type ProductExtended = Product & { gallery: { src: string, alt: string }[], productLocation: ProductLocationExtended[] }

async function getProducts() {
    return await prisma.product.findMany({
        include: {
            productLocation: {
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
        .then((res: ProductExtended[]) => res)
}

const colors = (locations: ProductLocationExtended[]) => {
    let list: string[] = []

    return locations.map((location: ProductLocationExtended) => {
        const color = location.color.color

        if (list.includes(color)) return
        else {
            list.push(color)

            return (
                <span key={location.id} style={{ background: color }} className='w-3 h-3 block rounded-full'></span>
            )
        }
    })
}

export const metadata = {
    title: 'فروشگاه اینترنتی | پنل ادمین'
}

const Admin = async () => {
    const products = await getProducts();

    return (
        <div className='mx-8 my-16 relative'>
            {
                (await isAdmin()) ?
                    <>
                        <Link href='/admin/product/add'>
                            <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </Link>

                        <ProductCards products={products} pageTarget='/admin/product/' />
                    </>
                    :
                    <h1>شما اجازه وارد شدن به این صفحه را ندارید!</h1>
            }
        </div>
    );
}

export default Admin;