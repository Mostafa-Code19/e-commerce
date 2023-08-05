'use client'

import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

import { useSession } from 'next-auth/react'
import ImageInput from './imageInput'
import CreateLocationForm from './createLocationForm'
import CreateProductForm from './createProductForm'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

type ProductProps = {
   id: string
   title: string
   productLocation: {
      price: number
      discount: number
      color: {
         color: string
      }
      size: {
         size: number
      }
   }[]
}

const AdminProduct = () => {
   const [selectedProduct, selectProduct] = useState<string | null>(null)
   const { data, error } = useSWR('/api/product', fetcher)

   if (error) {
      toast.error('دریافت محصولات به مشکل برخورد کرد!')
      console.error(error)
   }

   useEffect(() => {
      document.title = 'تبریزیان ایکامرس | ادمین | ‌افزودن/تغییر محصول'
   }, [])

   const { data: session } = useSession()

   return (
      <div className='mx-6 md:mx-auto max-w-screen-md space-y-10 my-16'>
         {
            // @ts-ignore
            session?.role === 'ADMIN' ? (
               <>
                  <Breadcrumbs aria-label='breadcrumb'>
                     <Link className='text-gray-400' href='/'>
                        فروشگاه
                     </Link>
                     <Link className='text-gray-400' href='/admin'>
                        ادمین
                     </Link>
                     <Link className='text-gray-400' href='/admin/products'>
                        محصولات
                     </Link>
                     <h5 className='font-semibold'>افزودن</h5>
                  </Breadcrumbs>

                  <div className='flex flex-col p-4 bg-gradient-to-b from-gray-100 to-gray-200 max-w-md space-y-5 mx-auto'>
                     <div>
                        <div className='flex space-x-5 w-full'>
                           <CreateProductForm />

                           {data ? (
                              <Autocomplete
                                 id='productKey'
                                 options={data}
                                 onChange={(e, value) => value && selectProduct(value.id)}
                                 getOptionLabel={(option: ProductProps) => option.title}
                                 renderInput={(params) => <TextField {...params} label='محصول' />}
                                 sx={{ width: '100%' }}
                              />
                           ) : (
                              <h3>هیچ محصولی برای انتخاب وجود ندارد</h3>
                           )}
                        </div>
                     </div>

                     <hr className='border-black border-2' />

                     <ImageInput selectedProduct={selectedProduct} />

                     <hr className='border-black border-2' />

                     <CreateLocationForm selectedProduct={selectedProduct} />
                  </div>
               </>
            ) : (
               <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
            )
         }
      </div>
   )
}

export default AdminProduct
