import BackButton from "@/components/back-btn";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import User from "@/lib/user";
import Link from "next/link";

const Profile = async () => {
    const user = await User()

    return (
        <div className='mx-8 my-16 space-y-10'>
            {
                user ?
                <>
                    <div className='flex justify-between items-center'>
                        <BackButton />
                        <h1>پروفایل من</h1>
                        <span></span>
                    </div>

                    <div className='text-center'>
                        <h1 className='font-semibold'>{user.name || user.email}</h1>
                        <h2 className='text-zinc-400 text-base'>{user.mobile_number || user.phone_number }</h2>
                    </div>

                    <div className='px-4 py-10 space-y-8 bg-zinc-100 rounded-t-2xl'>
                        <div>
                            <Link href='/profile/edit'>
                                <div className='flex justify-between items-center'>
                                    <svg className="h-6 w-6 my66 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div className='flex space-x-3 items-center'>
                                        <span className='text-base text-black'>ویرایش پروفایل</span>
                                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href='profile/orders'>
                                <div className='flex justify-between items-center'>
                                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div className='flex space-x-3 items-center'>
                                        <span className='text-base text-black'>سفارش های من</span>
                                        <svg className="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="6" height="5" rx="2" />  <rect x="4" y="13" width="6" height="7" rx="2" />  <rect x="14" y="4" width="6" height="7" rx="2" />  <rect x="14" y="15" width="6" height="5" rx="2" /></svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='text-slate-400'>
                            {/* <Link href='#'> */}
                                <div className='flex justify-between items-center'>
                                    <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div className='flex space-x-3 items-center'>
                                        <span className='text-xs text-slate-400'>(غیر فعال)</span>
                                        <span className='text-base text-slate-400'>مورد علاقه های من</span>
                                        <svg className="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>
                        <div className='text-slate-400'>
                            {/* <Link href='#'> */}
                                <div className='flex justify-between items-center'>
                                    <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div className='flex space-x-3 items-center'>
                                        <span className='text-xs text-slate-400'>(غیر فعال)</span>
                                        <span className='text-base text-slate-400'>پیام های من</span>
                                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>
                    </div>
                    
                    <LogoutButton />
                </>
                :
                <>
                    <div className='flex justify-between items-center'>
                        <BackButton />
                        <h1>لطفا ابتدا وارد شوید</h1>
                        <span></span>
                    </div>
                    <LoginButton />
                </>
            }
        </div>
    );
}

export default Profile;