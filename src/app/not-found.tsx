import Link from 'next/link'

export default function NotFound() {
   return (
      <div
         className='
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-indigo-600
    to-blue-400
  '
      >
         <div className='px-40 py-20 bg-white rounded-md shadow-xl'>
            <div className='flex flex-col items-center'>
               <h1 className='font-bold text-blue-600 text-9xl'>۴۰۴</h1>

               <h6 className='mb-2 text-xl items-end font-bold flex text-center text-gray-800 md:text-3xl'>
                  !صفحه پیدا نشد
                  <span className='text-red-500 text-2xl ml-3'>!اوپس</span>
               </h6>

               <p className='mb-8 text-center text-gray-500 md:text-lg'>
                  !صفحه‌ای که دنبالش هستید وجود نداره
               </p>

               <Link href='/' className='px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100'>
                  رفتن به صفحه اصلی
               </Link>
            </div>
         </div>
      </div>
   )
}
