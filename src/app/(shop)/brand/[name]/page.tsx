import BackButton from '@/components/back-btn'
import BrandProducts from './brand.products'

export const generateMetadata = async ({ params }: { params: { name: string } }) => {
   return {
      title: params.name + ' | تبریزیان ایکامرس',
   }
}

const Brand = ({ params }: { params: { name: string } }) => {
   const brandName = params.name

   return (
      <div className='mx-4 my-8 space-y-7'>
         <div className='flex justify-between items-center mx-auto max-w-md'>
            <BackButton />
            <h1 className='text-center font-bold'>{brandName}</h1>
            <span></span>
         </div>

         <BrandProducts brandName={brandName} />
      </div>
   )
}

export default Brand
