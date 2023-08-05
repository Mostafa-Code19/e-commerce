import FormikInput from '@/formik/input'
import FormikTextarea from '@/formik/textarea'
import { Brand } from '@prisma/client'

import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useSWR from 'swr'
import CircularProgress from '@mui/material/CircularProgress'

import { ProductSchemaValidation } from '@/formik/schema/validation'
import fetcher from '@/lib/fetcher'

// @ts-ignore
const CreateProductForm = () => {
   const [newProductPanel, setNewProductPanel] = useState<boolean>(false)

   const { data: brands, error } = useSWR('/api/brand', fetcher)

   if (error) {
      toast.error('دریافت برند ها به مشکل برخورد کرد!')
      console.error(error)
   }

   const handleSubmit = async (
      values: { title: string; description: string; brand: string },
      // @ts-ignore
      { resetForm },
   ) => {
      try {
         const res = await fetch('/api/product', {
            method: 'POST',
            body: JSON.stringify(values),
         })

         if (!res.ok) throw new Error()

         setNewProductPanel(false)
         resetForm()
         toast.success('محصول جدید با موفقیت اضافه شد.')
      } catch (err) {
         toast.error('در ثبت محصول جدید خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <button onClick={() => setNewProductPanel(true)}>
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
                  d='M12 4v16m8-8H4'
               />
            </svg>
         </button>

         <Dialog onClose={() => setNewProductPanel(false)} open={newProductPanel}>
            <div className='bg-slate-100 p-3'>
               <Formik
                  initialValues={{
                     title: '',
                     description: '',
                     brand: '',
                  }}
                  validationSchema={ProductSchemaValidation}
                  onSubmit={handleSubmit}
               >
                  {({ isSubmitting, setFieldValue, errors, touched }) => (
                     <Form>
                        <FormikInput
                           label='عنوان محصول'
                           name='title'
                           type='text'
                           placeholder='عنوان'
                        />

                        <hr />

                        <Autocomplete
                           id='brand'
                           options={brands}
                           onChange={(e, value) => {
                              if (value) setFieldValue('brand', value.id)
                           }}
                           getOptionLabel={(option: Brand) => option.name}
                           renderInput={(params) => <TextField {...params} label='برند' />}
                           sx={{ width: '100%' }}
                        />

                        {errors.brand && touched.brand ? (
                           <p className='text-sm text-red-500'>{errors.brand}</p>
                        ) : (
                           ''
                        )}

                        <hr />

                        <FormikTextarea
                           label='توضیحات محصول'
                           name='description'
                           placeholder='توضیحات'
                        />

                        <button
                           type='submit'
                           disabled={isSubmitting}
                           className='w-full px-5 py-3 mt-10 bg-green-500 shadow-lg shadow-green-300 rounded text-white'
                        >
                           {isSubmitting ? (
                              <div className='flex justify-center'>
                                 <CircularProgress color='success' size={25} />
                              </div>
                           ) : (
                              'ثبت محصول'
                           )}
                        </button>
                     </Form>
                  )}
               </Formik>
            </div>
         </Dialog>
      </>
   )
}

export default CreateProductForm
