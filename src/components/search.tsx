'use client';

import Link from 'next/link';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { CartContext } from '@/context/provider/cart';

const SearchInput = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const router = useRouter();

   const { cart }: any = useContext(CartContext as any);

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (searchQuery.trim()) {
         router.push(`/search?query=${searchQuery}`);
      }
   };

   return (
      <div className="flex justify-between items-center md:mx-16 md:my-3">
         <div className="space-x-5 hidden md:flex">
            <div className="border-r border-r-gray-500 pr-4">
               <Link href="/checkout/cart" className="relative">
                  <svg
                     className="h-8 w-8"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     {' '}
                     <circle cx="9" cy="21" r="1" />{' '}
                     <circle cx="20" cy="21" r="1" />{' '}
                     <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {Object.keys(cart ?? {}).length ? (
                     <span
                        style={{ paddingTop: '.1rem', paddingBottom: '.1rem' }}
                        className="absolute -right-2 -bottom-2 bg-blue-400 text-white px-2 rounded-full font-semibold"
                     >
                        {Object.keys(cart ?? {}).length}
                     </span>
                  ) : (
                     ''
                  )}
               </Link>
            </div>
            <div>
               <Link href="/profile">
                  <svg
                     className="text-black h-8 w-8"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                     />
                  </svg>
               </Link>
            </div>
         </div>
         <div className="flex items-center md:w-auto w-full">
            <div className="flex justify-center w-full md:w-auto items-center relative mt-5">
               <form onSubmit={handleFormSubmit} className="flex w-full">
                  <input
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="rounded-xl rtl w-full mx-7 pr-10 py-2"
                     type="text"
                     placeholder="جستجوی محصولات..."
                  />
               </form>
               <svg
                  className="h-7 w-7 absolute right-8 top-1 text-slate-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
               </svg>
            </div>
            <div className="hidden md:block">
               <Link href="/">
                  <Image
                     className="object-contain"
                     src="/hero.png"
                     alt="logo"
                     width="50"
                     height="50"
                  />
               </Link>
            </div>
         </div>
      </div>
   );
};

export default SearchInput;
