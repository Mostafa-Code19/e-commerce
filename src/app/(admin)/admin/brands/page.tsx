import Link from 'next/link'
import isAdmin from '@/lib/isAdmin'
import BrandNewInput from './create.Input'
import DeleteButton from './delete.button'
import Name from './name.component'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export const metadata = {
   title: '‌تبریزیان ایکامرس | پنل ادمین | برند ها',
}

const getBrand = async () => {
   return await prisma.brand.findMany({
      include: {
         products: true,
      },
   })
}

const AdminBrands = async () => {
   const brands = await getBrand()

   return (
      <div className='mx-6 md:mx-auto my-16 max-w-screen-md space-y-10'>
         {(await isAdmin()) ? (
            <>
               <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     فروشگاه
                  </Link>
                  <Link className='text-gray-400' href='/admin'>
                     ادمین
                  </Link>
                  <h5 className='font-semibold'>برند ها</h5>
               </Breadcrumbs>

               <BrandNewInput />

               <div>
                  <div className='md:grid md:grid-cols-2 md:gap-2 mb-2'>
                     <div className='bg-white grid grid-cols-3 justify-between rounded-lg px-6 py-2 text-center items-center'>
                        <p className='flex'>نام برند</p>
                        <p>تعداد محصولات</p>
                        <p className='flex justify-end'>حدف</p>
                     </div>

                     <div className='hidden md:grid md:grid-cols-3 bg-white justify-between rounded-lg px-6 py-2 text-center items-center'>
                        <p className='flex'>نام برند</p>
                        <p>تعداد محصولات</p>
                        <p className='flex justify-end'>حدف</p>
                     </div>
                  </div>

                  <div className='md:grid md:grid-cols-2 md:gap-2'>
                     {brands.length ? (
                        brands.map((brand) => {
                           return (
                              <div
                                 key={brand.id}
                                 className='bg-white my-1 md:my-0 grid grid-cols-3 justify-between rounded-lg px-6 py-2 text-center items-center'
                              >
                                 <Name brand={brand} />
                                 <p>{brand.products.length}</p>
                                 <DeleteButton id={brand.id} />
                              </div>
                           )
                        })
                     ) : (
                        <h3 className='text-center'>هیچ برندی ثبت نشده است</h3>
                     )}
                  </div>
               </div>
            </>
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default AdminBrands
