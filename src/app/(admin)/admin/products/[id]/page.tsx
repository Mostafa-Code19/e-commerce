import Link from 'next/link'
import Images from '@/components/product/images'
import PriceDiscountQtyEdit from './priceDiscountQtyEdit'
import { prisma } from '@/lib/prisma'
import PublicEdit from './button.publicEdit'

import isAdmin from '@/lib/isAdmin'
import ProductTitleDescription from './titleAndDescription'
import Breadcrumbs from '@mui/material/Breadcrumbs'

async function getProductLocations(productId: string) {
   return await prisma.product
      .findUnique({
         where: {
            id: productId,
         },
         include: {
            productLocation: {
               include: {
                  color: {
                     select: {
                        color: true,
                     },
                  },
                  size: {
                     select: {
                        size: true,
                     },
                  },
               },
            },
            gallery: {
               select: {
                  id: true,
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res) => res)
}

export const metadata = {
   title: 'تبریزیان ایکامرس | ادمین | چهره های محصول',
}

const ProductLocations = async ({ params }: { params: { id: string } }) => {
   const product = await getProductLocations(params.id)

   return (
      <div className='mx-6 my-16 relative'>
         {(await isAdmin()) ? (
            pageContent(product)
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default ProductLocations

type TypeProduct =
   | ({
        productLocation: ({ color: { color: string } | null; size: { size: number } | null } & {
           id: string
           public: boolean
           productId: string
           colorId: string | null
           sizeId: string | null
           quantity: number
           price: number
           discount: number
        })[]
        gallery: { id: string; src: string; alt: string }[]
     } & {
        id: string
        title: string
        brandId: string | null
        description: string | null
        createdAt: Date
        updatedAt: Date
     })
   | null

const pageContent = (product: TypeProduct) => {
   return (
      <div className='mx-6 md:mx-auto max-w-screen-md space-y-10 my-16'>
         {product ? (
            <>
               <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     فروشگاه
                  </Link>
                  <Link className='text-gray-400' href='/admin'>
                     ادمین
                  </Link>
                  <Link className='text-gray-400' href='/admin/products'>
                     محصولات
                  </Link>
                  <h5 className='font-semibold'>{product.title}</h5>
               </Breadcrumbs>

               <div className='max-w-md mx-auto'>
                  <Link href='/admin/products/add'>
                     <button className='bg-white z-10 border-2 border-blue-500 rounded-full p-3 fixed bottom-10 right-5'>
                        <svg
                           className='h-6 w-6 text-blue-500'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 4v16m8-8H4'
                           />
                        </svg>
                     </button>
                  </Link>

                  <div className='space-y-3'>
                     <ProductTitleDescription
                        id={product.id}
                        title={product.title}
                        description={product.description}
                     />
                  </div>

                  <Images isAdmin={true} thumbnail={product.gallery[0]} product={product} />

                  <hr />

                  <div className='my-5'>
                     <div className='w-full relative grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'>
                        <span className='font-semibold text-black text-sm'>رنگ</span>

                        <span className='font-semibold text-black text-sm'>سایز</span>

                        <span className='font-semibold text-black text-sm'>قیمت</span>

                        <span className='font-semibold text-black text-sm'>تخفیف</span>

                        <span className='text-black font-semibold text-sm'>تعداد</span>

                        <span className='text-black font-semibold text-sm'>عمومی</span>
                     </div>

                     {product.productLocation.map((location) => {
                        return (
                           <div
                              key={location.id}
                              className='w-full grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'
                           >
                              <span
                                 style={{ background: location.color?.color }}
                                 className='w-6 h-6 block rounded-full'
                              ></span>

                              <span className='font-semibold text-black text-sm'>
                                 {location.size?.size}
                              </span>

                              <PriceDiscountQtyEdit
                                 id={location.id}
                                 price={String(location.price)}
                                 discount={String(location.discount)}
                                 quantity={String(location.quantity)}
                              />

                              <PublicEdit id={location.id} publicProp={location.public} />
                           </div>
                        )
                     })}
                  </div>
               </div>
            </>
         ) : (
            <h1>آیتم پیدا نشد!</h1>
         )}
      </div>
   )
}
