import BackButton from '@/components/back-btn'
import LogoutButton from '@/app/(shop)/profile/logout.button'
import User from '@/lib/user'
import Link from 'next/link'

export const generateMetadata = async () => {
   const user = await User()

   if (user) {
      return {
         title: `پرفایل من | ${user?.name || user?.email}`,
      }
   } else {
      return {
         title: 'ورود / ثبت نام',
      }
   }
}

const Profile = async () => {
   const user = await User()

   return (
      <div className='mx-6 my-16 space-y-10'>
         <div className='flex justify-between items-center'>
            <BackButton />
            <h1>پروفایل من</h1>
            <span></span>
         </div>

         <div className='text-center'>
            <h1 className='font-semibold'>{user?.name || user?.email}</h1>
            <h2 className='text-zinc-400 text-base'>{user?.mobileNumber || user?.phoneNumber}</h2>
         </div>

         <div className='px-4 py-10 space-y-8 bg-zinc-100 rounded-2xl max-w-md mx-auto'>
            {user?.role == 'ADMIN' ? (
               <div>
                  <Link href='/admin'>
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
                           <span className='text-base text-black'>پنل ادمین</span>
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
                              <path d='M11 17a2.5 2.5 0 0 0 2 0' />{' '}
                              <path d='M12 3C7.336 3 4.604 5.331 4.138 8.595a11.816 11.816 0 0 0 1.998 8.592 10.777 10.777 0 003.199 3.064h0c1.666.999 3.664.999 5.33 0h0a10.777 10.777 0 0 0 3.199 -3.064 11.89 11.89 0 001.998-8.592C19.396 5.33 16.664 3 12 3z' />{' '}
                              <line x1='8' y1='11' x2='10' y2='13' />{' '}
                              <line x1='16' y1='11' x2='14' y2='13' />
                           </svg>
                        </div>
                     </div>
                  </Link>
               </div>
            ) : (
               ''
            )}

            <div>
               <Link href='/profile/edit'>
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
                        <span className='text-base text-black'>ویرایش پروفایل</span>
                        <svg
                           className='h-7 w-7'
                           viewBox='0 0 24 24'
                           fill='none'
                           stroke='currentColor'
                           strokeWidth='2'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />{' '}
                           <circle cx='12' cy='7' r='4' />
                        </svg>
                     </div>
                  </div>
               </Link>
            </div>

            <div>
               <Link href='profile/orders'>
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
                        <span className='text-base text-black'>سفارش های من</span>
                        <svg
                           className='h-7 w-7'
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
                           <rect x='4' y='4' width='6' height='5' rx='2' />{' '}
                           <rect x='4' y='13' width='6' height='7' rx='2' />{' '}
                           <rect x='14' y='4' width='6' height='7' rx='2' />{' '}
                           <rect x='14' y='15' width='6' height='5' rx='2' />
                        </svg>
                     </div>
                  </div>
               </Link>
            </div>

            <div className='text-slate-400'>
               {/* <Link href='#'> */}
               <div className='flex justify-between items-center'>
                  <svg
                     className='h-6 w-6 text-slate-400'
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
                     <span className='text-xs text-slate-400'>(غیر فعال)</span>
                     <span className='text-base text-slate-400'>مورد علاقه های من</span>
                     <svg
                        className='h-7 w-7'
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
                        <path d='M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7' />
                     </svg>
                  </div>
               </div>
               {/* </Link> */}
            </div>

            <div className='text-slate-400'>
               {/* <Link href='#'> */}
               <div className='flex justify-between items-center'>
                  <svg
                     className='h-6 w-6 text-slate-400'
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
                     <span className='text-xs text-slate-400'>(غیر فعال)</span>
                     <span className='text-base text-slate-400'>پیام های من</span>
                     <svg className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                     </svg>
                  </div>
               </div>
               {/* </Link> */}
            </div>

            <LogoutButton />
         </div>
      </div>
   )
}

export default Profile