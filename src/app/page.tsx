import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='mx-8 my-16'>
        <Link href={`#`}>
            <div>
                <div className='flex relative justify-between mb-16 from-blue-400 to-blue-700 w-full bg-gradient-to-r rounded-3xl'>
                    <div className='py-8 px-3'>
                        <h1 className='flex max-w-[50%] text-white items-center mb-4 ml-2 text-right'>
                            آیا آماده ای که مسیر رو هدایت کنی
                        </h1>
                        <button className='bg-white rounded-2xl text-blue-600 px-4 py-2'>
                            Discover
                        </button>
                    </div>
                    <div className='absolute -right-4 -top-9'>
                        <Image
                            className='object-cover'
                            src="/hero.png"
                            alt="nike shoe"
                            width='200'
                            height='200'
                        />
                    </div>
                </div>
            </div>
        </Link>

        <div className="mb-8">
            
            <div className='my-10 space-y-5'>
                <div className='flex justify-center space-x-3'>
                    <Link href='#'>
                        <div className='px-6 py-2 text-center rounded-xl bg-white'>
                            Nike
                        </div>
                    </Link>
                    <Link href='#'>
                        <div className='px-6 py-2 text-center rounded-xl bg-white'>
                            Adidas
                        </div>
                    </Link>
                    <Link href='#'>
                        <div className='px-6 py-2 text-center rounded-xl bg-white'>
                            Puma
                        </div>
                    </Link>
                    <Link href='#'>
                        <div className='px-6 py-2 text-center rounded-xl bg-white'>
                            Skechers
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h2>جدیدترین ها</h2>
                <Link href="/sort?s=newest" className="flex items-center space-x-1 space-x-reverse">
                    <span className='text-sm'>
                        نمایش همه
                    </span>
                </Link>
            </div>
            

            <div className="grid grid-cols-2">
                <Link href='/product/1'>
                    <div className='bg-white m-1 p-1 rounded-lg'>
                        <div className='bg-blue-400 relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                            <Image
                                className='object-cover justify-center m-auto p-2'
                                src="/product/2.png"
                                alt="nike shoe"
                                width='200'
                                height='200'
                            />
                            <div className='mx-3 flex justify-between mb-1 items-center'>
                                <div className=''>
                                    <h3>Nike Shoe</h3>
                                    <span className='font-semibold text-black text-sm'>$20</span>
                                </div>
                                <button className='bg-slate-700 p-1 rounded-full'>
                                    <svg className="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className='bg-white m-1 p-1 rounded-lg'>
                    <div className='bg-blue-400 relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                        <Image
                            className='object-cover justify-center m-auto p-2'
                            src="/product/4.png"
                            alt="nike shoe"
                            width='200'
                            height='200'
                        />
                        <div className='mx-3 flex justify-between mb-1 items-center'>
                            <div className=''>
                                <h3>Adidas Shoe</h3>
                                <span className='font-semibold text-black text-sm'>$20</span>
                            </div>
                            <button className='bg-slate-700 p-1 rounded-full'>
                                <svg className="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className='bg-white m-1 p-1 rounded-lg'>
                    <div className='bg-blue-400 relative flex flex-col aspect-square from-blue-400 to-blue-200 bg-gradient-to-bl rounded-xl'>
                        <Image
                            className='object-cover justify-center m-auto p-2'
                            src="/product/5.png"
                            alt="nike shoe"
                            width='200'
                            height='200'
                        />
                        <div className='mx-3 flex justify-between mb-1 items-center'>
                            <div className=''>
                                <h3>Puma Shoe</h3>
                                <span className='font-semibold text-black text-sm'>$20</span>
                            </div>
                            <button className='bg-slate-700 p-1 rounded-full'>
                                <svg className="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
