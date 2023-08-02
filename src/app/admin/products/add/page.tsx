'use client';

import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { toast } from 'react-toastify';

import BackButton from '@/components/back-btn';

import { useSession } from 'next-auth/react';
import ImageInput from './imageInput';
import CreateLocationForm from './createLocationForm';
import CreateProductForm from './createProductForm';

type ProductProps = {
   id: string;
   title: string;
   productLocation: {
      price: number;
      discount: number;
      color: {
         color: string;
      };
      size: {
         size: number;
      };
   }[];
};

const AdminProduct = () => {
   const [products, setProducts] = useState<ProductProps[]>([]);
   const [selectedProduct, selectProduct] = useState<string | null>(null);

   useEffect(() => {
      document.title = 'فروشگاه اینترنتی | ادمین | ‌افزودن/تغییر محصول';
      fetchProducts();
   }, []);

   const { data: session } = useSession();

   const fetchProducts = async () => {
      try {
         const res = await axios.get('/api/product/');
         if (res.status == 200) return setProducts(res.data);
         else {
            toast.error(`دریافت محصولات به مشکل برخورد کرد!`);
            console.log('err fetch products res not 200', res);
         }
      } catch (err) {
         toast.error(`دریافت محصولات به مشکل برخورد کرد!`);
         console.log('err fetch products', err);
      }
   };

   return (
      <div className="mx-8 my-16">
         {session?.role === 'ADMIN' ? (
            <>
               <div className="flex items-center justify-between">
                  <BackButton />
                  <h1>‌افزودن/انتخاب محصول</h1>
                  <span></span>
               </div>

               <div className="flex flex-col max-w-md space-y-5 mx-auto">
                  <div>
                     <div className="flex space-x-5 w-full">
                        <CreateProductForm fetchProducts={fetchProducts} />

                        {products && (
                           <Autocomplete
                              id="productKey"
                              options={products}
                              onChange={(e, value) =>
                                 value && selectProduct(value.id)
                              }
                              getOptionLabel={(option: ProductProps) =>
                                 option.title
                              }
                              renderInput={(params) => (
                                 <TextField {...params} label="محصول" />
                              )}
                              sx={{ width: '100%' }}
                           />
                        )}
                     </div>
                  </div>

                  <hr className="border-black border-2" />

                  <ImageInput selectedProduct={selectedProduct} />

                  <hr className="border-black border-2" />

                  <CreateLocationForm selectedProduct={selectedProduct} />
               </div>
            </>
         ) : (
            <h3 className="text-center">
               شما اجازه وارد شدن به این صفحه را ندارید!
            </h3>
         )}
      </div>
   );
};

export default AdminProduct;
