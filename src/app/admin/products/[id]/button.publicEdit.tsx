'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type PropsType = {
   id: string;
   publicProp: boolean;
};

const PublicEdit = ({ id, publicProp }: PropsType) => {
   const [publicStatus, setPublicStatus] = useState<boolean>(publicProp);

   const changePublicStatus = async () => {
      const payload = {
         id: id,
         public: !publicStatus,
      };

      try {
         const res = await axios.patch(
            '/api/product/location/update/public',
            payload,
         );

         if (res.status == 200) {
            setPublicStatus((prev) => !prev);
            return toast.success(' عمومیت با موفقیت تغییر یافت.');
         } else {
            toast.error('در تغییر عمومی بودن کالا خطایی رخ داد!');
            console.log('public change res not 200', res);
         }
      } catch (err) {
         toast.error('در تغییر عمومی بودن کالا خطایی رخ داد!');
         console.log('public change err', err);
      }
   };

   return (
      <button onClick={changePublicStatus}>
         {publicStatus ? (
            <svg
               className="h-5 w-5 text-black"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               {' '}
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />{' '}
               <circle cx="12" cy="12" r="3" />
            </svg>
         ) : (
            <svg
               className="h-5 w-5 text-black"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               {' '}
               <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />{' '}
               <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
         )}
      </button>
   );
};

export default PublicEdit;
