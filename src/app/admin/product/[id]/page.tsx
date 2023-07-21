import Link from "next/link";
import Images from "@/components/product/images";
import PriceDiscountQtyEdit from "./priceDiscountQtyEdit";
import prisma from "@/lib/prisma";
import PublicEdit from "./button.publicEdit";
import BackButton from "@/components/back-btn";

import { Product, ProductLocation } from '@prisma/client'
import isAdmin from "@/lib/isAdmin";

type ProductLocationExtended = ProductLocation & { color: { color: string }, size: { size: number } }
type ProductExtended = Product & { gallery: { id: string, src: string, alt: string }[], productLocation: ProductLocationExtended[] }

async function getProductLocations(productId: string) {
    return await prisma.product.findUnique({
        where: {
            id: productId
        },
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
                    }
                }
            },
            gallery: {
                select: {
                    id: true,
                    src: true,
                    alt: true
                }
            }
        }
    })
        .then((res: ProductExtended | null) => res)
}


export const metadata = {
    title: 'فروشگاه اینترنتی | ادمین | چهره های محصول'
}

const ProductLocations = async ({ params }: { params: { id: string } }) => {
    const product: ProductExtended | null = await getProductLocations(params.id)

    return (
        <div className='mx-8 my-16 relative'>
            {
                (await isAdmin()) ?
                    pageContent(product)
                    :
                    <h1>شما اجازه وارد شدن به این صفحه را ندارید!</h1>
            }
        </div>
    );
}

export default ProductLocations;

const pageContent = (product: ProductExtended | null) => {
    return (
        <>
            {
                product ?
                    <>
                        <div className='flex items-center justify-between'>
                            <BackButton />
                            <h1>چهره های محصول</h1>
                            <span></span>
                        </div>
            
                        <Link href='/admin/product/add'>
                            <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </Link>
            
                        <Images isAdmin={true} thumbnail={product.gallery[0]} product={product} />
            
                        <hr />
            
                        <div className='my-5'>
            
                            <div className='w-full relative grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'>
                                <span className='font-semibold text-black text-sm'>
                                    رنگ
                                </span>
            
                                <span className='font-semibold text-black text-sm'>
                                    سایز
                                </span>
            
                                <span className='font-semibold text-black text-sm'>
                                    قیمت
                                </span>
            
                                <span className='font-semibold text-black text-sm'>
                                    تخفیف
                                </span>
            
                                <span className='text-black font-semibold text-sm'>
                                    تعداد
                                </span>
            
                                <span className='text-black font-semibold text-sm'>
                                    عمومی
                                </span>
                            </div>
            
                            {product.productLocation.map((location: ProductLocationExtended) => {
                                return (
                                    <div key={location.id} className='w-full grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'>
            
                                        <span style={{ background: location.color.color }} className='w-6 h-6 block rounded-full'></span>
            
                                        <span className='font-semibold text-black text-sm'>
                                            {location.size.size}
                                        </span>
            
                                        <PriceDiscountQtyEdit id={location.id} price={String(location.price)} discount={String(location.discount)} quantity={String(location.quantity)} />
            
                                        <PublicEdit id={location.id} publicProp={location.public} />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                    :
                    <h1>آیتم پیدا نشد!</h1>
            }
        </>
    );
}