import Link from "next/link";
import Image from 'next/image'
import Images from "@/components/product/images";
import EditQty from "./editQty";
import prisma from "@/lib/prisma";

async function getProductLocations(productId) {
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
        .then((res: any) => res)
}

type ProductLocationProps = {
    id: string;
    title: string;
    productLocation: {
        price: number;
        discount: number;
        color: {
            color: string;
        }
        size: {
            size: number
        }
    }[],
    gallery: {
        src: string
        alt: string
    }[]
}

type LocationProps = {
    id: string;
    price: number;
    discount: number;
    quantity: number;
    color: {
        color: string;
    }
    size: {
        size: number
    }
}

const ProductLocations = async ({ params }) => {
    const product = await getProductLocations(params.id)
    
    return (
        <div className='mx-8 my-16 relative'>
            <Link href='/admin/product/add'>
                <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                    <svg class="h-6 w-6 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
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

                {
                    product.productLocation.map((location:LocationProps) => {
                        return (
                            <div key={location.id} className='w-full grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'>

                                <span style={{background: location.color.color}} className='w-6 h-6 block rounded-full'></span>

                                <span className='font-semibold text-black text-sm'>
                                    {location.size.size}
                                </span>

                                <span className='font-semibold text-black text-sm'>
                                    {location.price.toLocaleString()}
                                </span>

                                <span className='font-semibold text-black text-sm'>
                                    {location.discount}%
                                </span>

                                <EditQty id={location.id} quantity={location.quantity} />

                                <button>
                                    <svg className="h-5 w-5 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
                                </button>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default ProductLocations;