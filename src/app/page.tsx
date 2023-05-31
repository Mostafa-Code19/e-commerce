import Image from 'next/image'
import Link from 'next/link'

import prisma from '../../lib/prisma';

async function getProducts() {
    return await prisma.product.findMany({
        include: {
            productLocation: {
                include: {
                    color: {
                        select: {
                            color: true,
                            gallery: {
                                select: {
                                    src: true,
                                    alt: true
                                }
                            }
                        }
                    },
                    size: {
                        select: {
                            size: true
                        }
                    },
                }
            }
        }
    })
        .then((res: any) => res)
}

type ProductProps = {
    id: string;
    title: string;
    productLocation: {
        price: number;
        discount: number;
        color: {
            color: string;
            gallery: {
                src: string
                alt: string
            }[]
        }
        size: {
            size: number
        }
    }[]
}

const colors = (locations: any) => {
    let list: any = []

    return locations.map((location: {
        id: string,
        color: {
            color: string
        }
    }) => {
        const color = location.color.color
        
        if (list.includes(color)) return
        else {
            list.push(color)
            
            return (
                <span key={location.id} style={{background: color}} className='w-3 h-3 block rounded-full'></span>
            )
        }
    })
}

async function Home()  {
    const products = await getProducts();

    return (
        <div className='mx-8 my-16'>
            <Link href='#'>
                <div>
                    <div className='flex relative justify-between mb-16 from-blue-400 to-blue-700 w-full bg-gradient-to-r rounded-3xl'>
                        <div className='py-8 px-3'>
                            <h1 className='flex max-w-[50%] text-white items-center mb-4 ml-2 text-right'>
                                آیا آماده ای که مسیر رو هدایت کنی
                            </h1>
                            <button className='bg-white rounded-2xl text-blue-600 px-4 py-2'>
                                مشاهده
                            </button>
                        </div>
                        <div className='absolute -right-4 -top-9'>
                            <Image
                                className='object-cover'
                                src="/hero.png"
                                alt="nike shoe"
                                width='200'
                                height='200'
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mb-8">
                
                <div className='my-10 space-y-5'>
                    <div className='flex justify-center space-x-3'>
                        <Link href='#'>
                            <div className='px-6 py-2 text-center rounded-xl bg-white'>
                                نایک
                            </div>
                        </Link>
                        <Link href='#'>
                            <div className='px-6 py-2 text-center rounded-xl bg-white'>
                                آدیداس
                            </div>
                        </Link>
                        <Link href='#'>
                            <div className='px-6 py-2 text-center rounded-xl bg-white'>
                                پوما
                            </div>
                        </Link>
                        <Link href='#'>
                            <div className='px-6 py-2 text-center rounded-xl bg-white'>
                                اسکیچرز
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2>جدیدترین ها</h2>
                    <Link href="#" className="flex items-center space-x-1 space-x-reverse">
                        <span className='text-sm'>
                            نمایش همه
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 space-x-3">
                    {
                        products.map((product:ProductProps) => {
                            return (
                                <Link key={product.id} href={`/product/${product.id}`}>
                                    <div className='bg-white w-full h-full m-1 p-1 rounded-lg'>
                                        <div className='bg-blue-400 w-full h-full relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                                            <div className='m-2'>
                                                <div className='flex space-x-1'>
                                                    {
                                                        colors(product.productLocation)
                                                    }
                                                </div>
                                            </div>
                                            <Image
                                                className='object-cover justify-center m-auto p-2'
                                                src={`${product.productLocation[0].color.gallery[0].src}`}
                                                alt={product.title}
                                                width='200'
                                                height='200'
                                            />
                                            <div className='mx-3 mb-1 text-right space'>
                                                <h2>{product.title}</h2>
                                                
                                                <div className='flex justify-between items-center'>
                                                    {
                                                        product.productLocation[0].discount ?
                                                        <span style={{paddingTop: '.1rem'}} className='bg-red-500 rounded-2xl px-2 text-white'>
                                                            {product.productLocation[0].discount}%
                                                        </span>
                                                        :
                                                        ''
                                                    }
                                                    <span className='font-semibold text-black text-sm toman_card'>
                                                        {
                                                            product.productLocation[0].discount ?
                                                            (product.productLocation[0].price - ((product.productLocation[0].price * product.productLocation[0].discount) / 100)).toLocaleString()
                                                            :
                                                            product.productLocation[0].price.toLocaleString()
                                                        }
                                                    </span>
                                                </div>
                                                {
                                                    product.productLocation[0].discount ?
                                                    <span className='text-slate-500 line-through ml-8'>
                                                        {product.productLocation[0].price.toLocaleString()}
                                                    </span>
                                                    :
                                                    <span className='mb-6 block'></span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Home