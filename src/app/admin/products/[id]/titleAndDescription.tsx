'use client'

import axios from 'axios'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { persianRule } from '@/formik/schema/schemaRules'

const validationSchema = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(persianRule, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(persianRule, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})

const ProductTitleDescription = ({
   id,
   title,
   description,
}: {
   id: string
   title: string
   description: string | null
}) => {
   const handleSubmit = async (values: { title: string; description: string }) => {
      const payload: { title?: string; description?: string } = {}

      if (values.title !== title) payload.title = values.title
      if (values.description !== description) payload.description = values.description

      if (!Object.keys(payload).length) return

      try {
         const res = await axios.patch('/api/product/update', {
            data: payload,
            id: id,
         })

         if (res.status === 200) {
            toast.success('تغییرات با موفقیت ثبت گردید.')
            return
         } else {
            toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
            console.log('api/user/update !200', res)
            throw new Error(res.data)
         }
      } catch (err) {
         toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.log('api/user/update', err)
         // @ts-ignore
         throw new Error(err.message)
      }
   }

   return (
      <Formik
         initialValues={{
            title: title,
            description: description || '',
         }}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, handleBlur, isSubmitting, errors, touched }) => (
            <Form className='flex justify-center space-x-2'>
               {Object.keys(touched).length && !errors.title && !errors.description ? (
                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='border-2 border-green-600 px-1 rounded-md'
                  >
                     {isSubmitting ? (
                        <div className='flex justify-center'>
                           <svg
                              aria-hidden='true'
                              className='w-8 h-8 mx-2 text-gray-200 animate-spin dark:text-white fill-green-600'
                              viewBox='0 0 100 101'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                 fill='currentColor'
                              />
                              <path
                                 d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                 fill='currentFill'
                              />
                           </svg>
                        </div>
                     ) : (
                        'ذخیره'
                     )}
                  </button>
               ) : (
                  ''
               )}

               <div className='space-y-5 '>
                  <div className='justify-end flex space-x-5 bg-slate-100 rounded-lg p-3'>
                     <input
                        name='title'
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        onBlur={handleBlur}
                        value={values.title}
                        className='mr-3 w-full bg-transparent'
                        type='text'
                        placeholder='عنوان محصول'
                     />
                     <h2>:عنوان</h2>
                  </div>

                  {errors.title && touched.title ? (
                     <p className='text-sm text-red-500'>{errors.title}</p>
                  ) : (
                     ''
                  )}

                  <div className='justify-end flex space-x-5 bg-slate-100 rounded-lg p-3'>
                     <input
                        name='description'
                        onChange={(e) => setFieldValue('description', e.target.value)}
                        type='text'
                        onBlur={handleBlur}
                        value={values.description}
                        className='mr-3 w-full bg-transparent'
                        placeholder='توضیحات محصول'
                     />
                     <h2>:توضیحات</h2>
                  </div>

                  {errors.description && touched.description ? (
                     <p className='text-sm text-red-500'>{errors.description}</p>
                  ) : (
                     ''
                  )}
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default ProductTitleDescription
