import Link from "next/link";
import Image from 'next/image'

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

const colors = (locations: any) => {
    let list: any = []

    return locations.map((location: {
        id: string,
        color: {
            color: string
        },
        quantity: number
    }) => {
        if (location.quantity) {
            const color = location.color.color
            
            if (list.includes(color)) return
            else {
                list.push(color)
                
                return (
                    <span key={location.id} style={{background: color}} className='w-3 h-3 block rounded-full'></span>
                )
            }
        }
    })
}

const Admin = async () => {
    const products = await getProducts();

    return (
        <div className='mx-8 my-16 relative'>
            <Link href='/admin/product/add'>
                <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                    <svg class="h-6 w-6 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
            </Link>

            <div className='grid grid-cols-2 gap-2'>
                {
                    products.map((product:ProductProps) => {
                        return (
                            <Link key={product.id} href={`/admin/product/${product.id}`}>
                                <div className='bg-white w-full h-full m-1 p-1 rounded-lg'>
                                    <div className='bg-blue-400 w-full h-full relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                                        <div className='m-2'>
                                            <div className='flex space-x-1'>
                                                {
                                                    colors(product.productLocation)
                                                }
                                            </div>
                                        </div>
                                        {
                                            product.gallery[0] &&
                                            <Image
                                                className='object-cover justify-center m-auto p-2'
                                                src={`${product.gallery[0].src}`}
                                                alt={product.title}
                                                width='200'
                                                height='200'
                                            />
                                        }
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
    );
}
 
export default Admin;