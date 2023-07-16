import Image from 'next/image'
import Link from 'next/link'

import { Product, ProductLocation } from '@prisma/client'

type ProductLocationExtended = ProductLocation & { color: { color: string }, size: { size: number } }
type ProductExtended = Product & { gallery: { src: string, alt: string }[], productLocation: ProductLocationExtended[] }

const ProductCards = ({products} : {products: ProductExtended[]}) => {
    
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

    return (
        products?.length ?
            <div className='flex space-x-3'>
                {
                    products.map((product: ProductExtended) => {
                        if (!product.productLocation.length) return
                
                        return (
                            <Link key={product.id} href={`/product/${product.id}`}>
                                <div className='bg-white w-full h-full m-1 p-1 rounded-lg'>
                                    <div className='bg-blue-400 w-full h-full relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                                        <div className='m-2'>
                                            <div className='flex space-x-1'>
                                                {colors(product.productLocation)}
                                            </div>
                                        </div>
                                        <Image
                                            className='object-cover justify-center m-auto p-2'
                                            src={`${product.gallery[0].src}`}
                                            alt={product.title}
                                            width='200'
                                            height='200' />
                                        <div className='mx-3 mb-1 text-right space'>
                                            <h2>{product.title}</h2>
                
                                            <div className='flex justify-between items-center'>
                                                {product.productLocation[0].discount ?
                                                    <span style={{ paddingTop: '.1rem' }} className='bg-red-500 rounded-2xl px-2 text-white'>
                                                        {product.productLocation[0].discount}%
                                                    </span>
                                                    :
                                                    ''}
                                                <span className='font-semibold text-black text-sm toman_card'>
                                                    {product.productLocation[0].discount ?
                                                        (product.productLocation[0].price - ((product.productLocation[0].price * product.productLocation[0].discount) / 100)).toLocaleString()
                                                        :
                                                        product.productLocation[0].price.toLocaleString()}
                                                </span>
                                            </div>
                                            {product.productLocation[0].discount ?
                                                <span className='text-slate-500 line-through ml-8'>
                                                    {product.productLocation[0].price.toLocaleString()}
                                                </span>
                                                :
                                                <span className='mb-6 block'></span>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            :
            <h1>!محصولی یافت نشد</h1>
    )
}
 
export default ProductCards;