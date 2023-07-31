'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/legacy/image';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { MuiColorInput } from 'mui-color-input';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Brand } from '@prisma/client';

import BackButton from '@/components/back-btn';

import { useSession } from 'next-auth/react';

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
   const [brands, setBrands] = useState<Brand[]>([]);
   const [newProductPanel, setNewProductPanel] = useState<boolean>(false);
   const [selectedProduct, selectProduct] = useState<string | null>(null);
   const [selectedBrand, selectBrand] = useState<string | null>(null);
   const [publicState, setPublic] = useState<boolean>(true);
   const [color, setColor] = useState<string>('#696969');
   const [productImages, setProductImages] = useState<File | null>(null);

   const titleRef = useRef<HTMLInputElement>(null);
   const descriptionRef = useRef<HTMLTextAreaElement>(null);
   const priceRef = useRef<HTMLInputElement>(null);
   const discountRef = useRef<HTMLInputElement>(null);
   const sizeRef = useRef<HTMLInputElement>(null);
   const quantityRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      document.title = 'فروشگاه اینترنتی | ادمین | ‌افزودن محصول جدید';
      fetchProducts();
      fetchBrands();
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

   const fetchBrands = async () => {
      try {
         const res = await axios.get('/api/brand/');
         if (res.status == 200) return setBrands(res.data);
         else {
            toast.error(`دریافت برند ها به مشکل برخورد کرد!`);
            console.log('err fetch brands res not 200', res);
         }
      } catch (err) {
         toast.error(`دریافت برند ها به مشکل برخورد کرد!`);
         console.log('err fetch brands', err);
      }
   };

   const addProductLocation = async () => {
      if (selectedProduct === null)
         return toast.warning(`هیچ محصولی انتخاب نشده است!`);
      if (
         color == '#696969' ||
         !sizeRef.current?.value ||
         !quantityRef.current?.value ||
         !priceRef.current?.value ||
         !discountRef.current?.value
      )
         return toast.warning('برخی از ورود ها تکمیل نمی‌باشد!');

      const payload = {
         public: publicState,
         productId: selectedProduct,
         color: color,
         size: sizeRef.current?.value,
         quantity: quantityRef.current?.value,
         price: priceRef.current?.value,
         discount: discountRef.current?.value,
      };

      try {
         const res = await axios.post(`/api/product/location/add`, payload);
         if (res.status === 200)
            return toast.success(`چهره جدید محصول با موفقیت اضافه شد.`);
         else {
            toast.error(`در ثبت چهره جدید محصول خطایی رخ داد!`);
            console.log(
               'err: در ثبت چهره جدید محصول خطایی رخ داد! res not 200',
               res,
            );
         }
      } catch (err) {
         toast.error(`در ثبت چهره جدید محصول خطایی رخ داد!`);
         console.log('err: در ثبت چهره جدید محصول خطایی رخ داد!', err);
      }
   };

   const addNewProduct = async () => {
      const title = titleRef?.current?.value;
      const description = descriptionRef?.current?.value;

      if (
         !title?.trim().length ||
         !description?.trim().length ||
         !selectedBrand
      )
         return toast.error(
            'برای افزودن محصول جدید لطفا تمام ورودی ها را کامل کنید',
         );

      try {
         const res = await axios.post('/api/product/add', {
            title: title,
            brand: selectedBrand,
            description: description,
         });

         if (res.status == 200 && res.data.id) {
            fetchProducts();
            setNewProductPanel(false);
            return toast.success(`محصول جدید با موفقیت اضافه شد.`);
         } else {
            toast.error(`در ثبت محصول جدید خطایی رخ داد!`);
            return console.log(
               'res add new product res not 200 or res.data.id not exist',
               res,
            );
         }
      } catch (err) {
         toast.error(`در ثبت محصول جدید خطایی رخ داد!`);
         return console.log('err add new product', err);
      }
   };

   const submitImage = async () => {
      if (productImages === null)
         return toast.warning(`هیچ تصویری برای آپلود انتخاب نشده است!`);
      if (selectedProduct === null)
         return toast.warning(
            `محصول مورد نظر جهت آپلود تصویر انتخاب نشده است!`,
         );

      const payload = {
         productId: selectedProduct,
         imageName: productImages.name,
      };

      try {
         const res = await axios.post('/api/product/image/add', payload);

         if (res.status == 200) {
            let { uploadUrl } = res.data;

            const putRes = await axios.put(uploadUrl, productImages);

            if (putRes.status == 200) {
               return toast.success(`تصویر با موفقیت آپلود گردید.`);
            } else {
               toast.error(`در آپلود تصویر خطایی رخ داد!`);
               return console.log('axios.put !200', putRes);
            }
         } else {
            toast.error(`در آپلود تصویر خطایی رخ داد!`);
            return console.log('api/product/image/add res not 200', res);
         }
      } catch (error) {
         toast.error(`در آپلود تصویر خطایی رخ داد!`);
         return console.log('api/product/image/add', error);
      }
   };

   return (
      <div className="mx-8 my-16">
         {session?.role === 'ADMIN' ? (
            <>
               <div className="flex items-center justify-between">
                  <BackButton />
                  <h1>افزودن محصول</h1>
                  <span></span>
               </div>

               <div className="flex flex-col space-y-3 max-w-md mx-auto">
                  <div className="flex space-x-5 w-full">
                     <button onClick={() => setNewProductPanel(true)}>
                        <svg
                           className="h-6 w-6 text-black"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                           />
                        </svg>
                     </button>
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

                  <Dialog
                     onClose={() => setNewProductPanel(false)}
                     open={newProductPanel}
                  >
                     <input
                        type="text"
                        placeholder="عنوان"
                        ref={titleRef}
                        className="px-6 py-1 text-right text-base"
                     />
                     <Autocomplete
                        id="brandKey"
                        options={brands}
                        onChange={(e, value) => value && selectBrand(value.id)}
                        getOptionLabel={(option: Brand) => option.name}
                        renderInput={(params) => (
                           <TextField {...params} label="برند" />
                        )}
                        sx={{ width: '100%' }}
                     />
                     <textarea
                        placeholder="توضیحات"
                        ref={descriptionRef}
                        cols={30}
                        rows={10}
                        className="pl-4 pr-6 py-1 border border-[#8C939D] rounded text-right bg-transparent text-[0.9rem] my-auto pt-3"
                     ></textarea>
                     <button onClick={addNewProduct}>ثبت محصول</button>
                  </Dialog>

                  <hr />

                  <Button variant="outlined" component="label">
                     <h5>تصاویر محصول</h5>
                     <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="productImage"
                        onChange={(e) =>
                           e.target.files && setProductImages(e.target.files[0])
                        }
                        multiple
                     />
                  </Button>

                  <div>
                     {productImages && (
                        <Image
                           className="object-contain"
                           key={productImages.name}
                           src={URL.createObjectURL(productImages)}
                           alt={titleRef?.current?.value || 'NaN'}
                           width={300}
                           height={200}
                           layout="responsive"
                        />
                     )}
                  </div>

                  <button
                     className="w-full px-5 py-3 mt-10 border border-green-500 rounded hover:text-black hover:bg-green-500"
                     onClick={submitImage}
                  >
                     ثبت تصاویر
                  </button>

                  <hr />

                  <div className="flex justify-end">
                     <FormControlLabel
                        control={
                           <Switch
                              onChange={() => {
                                 setPublic(publicState ? false : true);
                              }}
                           />
                        }
                        label={<h5>عمومی</h5>}
                     />
                  </div>

                  <input
                     type="number"
                     placeholder="قیمت به تومان"
                     ref={priceRef}
                     className="px-6 py-1 text-right text-base"
                  />
                  <input
                     type="number"
                     placeholder="تخفیف به درصد"
                     ref={discountRef}
                     className="px-6 py-1 text-right text-base"
                  />
                  <input
                     type="number"
                     placeholder="سایز"
                     ref={sizeRef}
                     className="px-6 py-1 text-right text-base"
                  />
                  <input
                     type="number"
                     placeholder="تعداد موجود"
                     ref={quantityRef}
                     className="px-6 py-1 text-right text-base"
                  />

                  <div className="flex justify-between items-center">
                     <MuiColorInput
                        value={color}
                        format="hex"
                        onChange={(e) => setColor(e)}
                     />
                     <h5>رنگ چهره محصول</h5>
                  </div>

                  <button
                     className="w-full px-5 py-3 mt-10 border border-green-500 rounded hover:text-black hover:bg-green-500"
                     onClick={addProductLocation}
                  >
                     افزودن
                  </button>
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
