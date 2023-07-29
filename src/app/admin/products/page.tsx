import Link from "next/link";
import { Product, ProductLocation } from '@prisma/client'

import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";

import ProductCards from "@/components/product/cards";
import BackButton from "@/components/back-btn";

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

export const metadata = {
    title: 'فروشگاه اینترنتی | پنل ادمین'
}

const AdminProducts = async () => {
    const products = await getProducts();

    return (
        <div className='mx-8 my-16 relative'>
            {
                (await isAdmin()) ?
                    <>
                    
                        <div className='flex justify-between items-center'>
                            <BackButton />
                            <h1>مدیریت محصولات</h1>
                            <span></span>
                        </div>

                        <Link href='/admin/products/add'>
                            <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </Link>

                        <ProductCards products={products} pageTarget='/admin/products/' />
                    </>
                    :
                    <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
            }
        </div>
    );
}

export default AdminProducts;