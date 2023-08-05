import Image from 'next/legacy/image'
import Link from 'next/link'

import { Product, ProductLocation } from '@prisma/client'

type ProductLocationExtended = ProductLocation & {
   color: { color: string }
   size: { size: number }
}
type ProductExtended = Product & {
   gallery: { src: string; alt: string }[]
   productLocation: ProductLocationExtended[]
}

const ProductCards = ({
   products,
   pageTarget,
   userTarget,
}: {
   products: ProductExtended[]
   pageTarget: string
   userTarget: string
}) => {
   const colors = (locations: ProductLocationExtended[]) => {
      const list: string[] = []

      return locations.map((location: ProductLocationExtended) => {
         const color = location.color.color

         if (list.includes(color)) return
         else {
            list.push(color)

            return (
               <span
                  key={location.id}
                  style={{ background: color }}
                  className='w-3 h-3 block rounded-full'
               ></span>
            )
         }
      })
   }

   return products?.length ? (
      <div className='grid grid-cols-2 gap-y-2 md:flex flex-row-reverse flex-wrap'>
         {products.map((product: ProductExtended) => {
            if (userTarget == 'client' && !product.productLocation.length) return

            return (
               <Link key={product.id} href={pageTarget + product.id}>
                  <div className='p-1 m-1 my-5 h-40 md:w-60 md:h-44 rounded-lg'>
                     <div className='w-full h-full relative flex flex-col aspect-square p-2 bg-white rounded-xl'>
                        <div className='from-blue-100 to-white bg-gradient-to-tr shadow-lg shadow-slate-200 rounded-xl -top-10 relative flex justify-center pb-3 mb-3'>
                           <div className='m-2'>
                              <div className='flex space-x-1'>
                                 {colors(product.productLocation)}
                              </div>
                           </div>
                           {product.gallery[0] && (
                              <Image
                                 className='object-contain'
                                 src={`${product.gallery[0].src}`}
                                 alt={product.title}
                                 width='170'
                                 height='90'
                              />
                           )}
                        </div>
                        <div className='mx-3 space-y-1 -top-10 relative text-right'>
                           <h2>{product.title}</h2>

                           <div className='flex justify-between items-center'>
                              {product.productLocation[0]?.discount ? (
                                 <span
                                    style={{ paddingTop: '.1rem' }}
                                    className='bg-red-500 rounded-2xl px-2 text-white'
                                 >
                                    {product.productLocation[0]?.discount}%
                                 </span>
                              ) : (
                                 <span></span>
                              )}
                              <span className='font-semibold text-black text-sm toman_card'>
                                 {product.productLocation[0]?.discount
                                    ? (
                                         product.productLocation[0]?.price -
                                         (product.productLocation[0]?.price *
                                            product.productLocation[0]?.discount) /
                                            100
                                      ).toLocaleString()
                                    : product.productLocation[0]?.price.toLocaleString()}
                              </span>
                           </div>
                           {product.productLocation[0]?.discount ? (
                              <span className='text-slate-500 line-through ml-8'>
                                 {product.productLocation[0]?.price.toLocaleString()}
                              </span>
                           ) : (
                              <span className='mb-3 block'></span>
                           )}
                        </div>
                     </div>
                  </div>
               </Link>
            )
         })}
      </div>
   ) : (
      <h3 className='text-center'>!محصولی یافت نشد</h3>
   )
}

export default ProductCards
