import BackButton from '@/components/back-btn'
import isAdmin from '@/lib/isAdmin'
import BrandNewInput from './create.Input'
import DeleteButton from './delete.button'
import Name from './name.component'
import prisma from '@/lib/prisma'

export const metadata = {
   title: '‌فروشگاه اینترنتی | پنل ادمین | برند ها',
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
      <div className='mx-6 my-16'>
         {(await isAdmin()) ? (
            <>
               <div className='flex justify-between items-center mb-10'>
                  <BackButton />
                  <h1>پنل ادمین</h1>
                  <span></span>
               </div>

               <BrandNewInput />

               <div className='mt-10'>
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
