'use client'

import Link from 'next/link'
import { usePathname }  from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className='fixed bottom-0 left-0 py-7 px-8 rounded-t-[30%] bg-white w-full flex justify-around'>
          <Link href='/'>
            <svg className={`${pathname=='/' ? 'text-blue-400' : 'text-gray-400'} h-8 w-8`} viewBox="0 0 24 24" fill={pathname=='/' ? "#60a5fa": 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g id="Home"><path d="M21.12,9.79l-7-7a3.08,3.08,0,0,0-4.24,0l-7,7A3,3,0,0,0,2,11.91v7.18a3,3,0,0,0,3,3H9v-6a3,3,0,0,1,6,0v6h4a3,3,0,0,0,3-3V11.91A3,3,0,0,0,21.12,9.79Z" /></g></svg>
          </Link>
          <Link href='/cart'>
            <svg className={`${pathname=='/cart' ? 'text-blue-400' : 'text-gray-400'} h-8 w-8`} viewBox="0 0 24 24" fill={pathname=='/cart' ? "#60a5fa": 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="9" cy="21" r="1" />  <circle cx="20" cy="21" r="1" />  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
          </Link>
          <Link href='/profile'>
            <svg className={`${pathname=='/profile' ? 'text-blue-400' : 'text-gray-400'} h-8 w-8`} fill={pathname=='/profile' ? "#60a5fa": 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </nav>
    );
}
 
export default Navbar;