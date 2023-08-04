import BackButton from '@/components/back-btn'
import User from '@/lib/user'
import Link from 'next/link'
import isAdmin from '@/lib/isAdmin'

export const metadata = {
   title: 'تبریزیان ایکامرس | پنل ادمین',
}

const AdminPanel = async () => {
   const user = await User()

   return (
      <div className='mx-6 my-16 space-y-10'>
         {(await isAdmin()) ? (
            <>
               <div className='flex justify-between items-center'>
                  <BackButton />
                  <h1>پنل ادمین</h1>
                  <span></span>
               </div>

               <div className='text-center'>
                  <h1 className='font-semibold'> {user?.name || user?.email} </h1>
                  <h2 className='ext-zinc-400 text-base'> به پنل خوش آمدید </h2>
               </div>

               <div className='px-4 py-10 space-y-8 bg-zinc-100 rounded-2xl max-w-sm mx-auto'>
                  <div>
                     <Link href='/admin/orders'>
                        <div className='flex justify-between items-center'>
                           <svg
                              className='h-6 w-6 my66 text-black'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M15 19l-7-7 7-7'
                              />
                           </svg>
                           <div className='flex space-x-3 items-center'>
                              <span className='text-base text-black'>سفارشات</span>
                              <svg
                                 className='h-6 w-6 text-black'
                                 width='24'
                                 height='24'
                                 viewBox='0 0 24 24'
                                 strokeWidth='2'
                                 stroke='currentColor'
                                 fill='none'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              >
                                 {' '}
                                 <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                 <circle cx='7' cy='17' r='2' /> <circle cx='17' cy='17' r='2' />{' '}
                                 <path d='M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5' />{' '}
                                 <line x1='3' y1='9' x2='7' y2='9' />
                              </svg>
                           </div>
                        </div>
                     </Link>
                  </div>
                  <div>
                     <Link href='/admin/products'>
                        <div className='flex justify-between items-center'>
                           <svg
                              className='h-6 w-6 text-black'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M15 19l-7-7 7-7'
                              />
                           </svg>
                           <div className='flex space-x-3 items-center'>
                              <span className='text-base text-black'>محصولات</span>
                              <svg
                                 className='h-6 w-6 text-black'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                                 />
                              </svg>
                           </div>
                        </div>
                     </Link>
                  </div>
                  <div>
                     <Link href='/admin/brands'>
                        <div className='flex justify-between items-center'>
                           <svg
                              className='h-6 w-6 text-black'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M15 19l-7-7 7-7'
                              />
                           </svg>
                           <div className='flex space-x-3 items-center'>
                              <span className='text-base text-black'>برند ها</span>
                              <svg
                                 className='h-6 w-6 text-black'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <svg
                                    className='h-6 w-6 text-black'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    strokeWidth='2'
                                    stroke='currentColor'
                                    fill='none'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                 >
                                    {' '}
                                    <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                    <line x1='3' y1='21' x2='21' y2='21' />{' '}
                                    <path d='M5 21v-14l8 -4v18' /> <path d='M19 21v-10l-6 -4' />{' '}
                                    <line x1='9' y1='9' x2='9' y2='9.01' />{' '}
                                    <line x1='9' y1='12' x2='9' y2='12.01' />{' '}
                                    <line x1='9' y1='15' x2='9' y2='15.01' />{' '}
                                    <line x1='9' y1='18' x2='9' y2='18.01' />
                                 </svg>
                              </svg>
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
            </>
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default AdminPanel
