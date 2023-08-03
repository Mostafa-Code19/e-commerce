'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import useSWR from 'swr'
import Backdrop from '@mui/material/Backdrop'

import FormikInput from '@/formik/input'
import FormikTextarea from '@/formik/textarea'
import BackButton from '@/components/back-btn'
import ProfileSchemaValidation from '@/formik/schema/profile'
import fetcher from '@/lib/fetcher'

interface FormType {
   name?: string
   mobile_number?: string
   phone_number?: string
   melli_code?: string
   address?: string
}

const Edit = () => {
   const { data, error, isLoading } = useSWR('/api/user', fetcher)

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }

   useEffect(() => {
      document.title = 'فروشگاه اینترنتی | ویرایش پروفایل'
   }, [])

   const onSubmit = async (values: FormType) => {
      const payload: FormType = Object.fromEntries(
         // @ts-ignore
         Object.entries(values).filter(([key, value]) => value !== data[key]),
      )

      const payloadLength = Object.keys(payload).length

      if (payloadLength) {
         try {
            const res = await fetch('/api/user/update', {
               method: 'PATCH',
               body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error()

            toast.success('تغییرات با موفقیت ثبت گردید.')
         } catch (err) {
            toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
            console.error(err)
         }
      }
   }

   return (
      <div className='mx-6 my-16 space-y-11'>
         <div className='flex justify-between items-center'>
            <BackButton />
            <h1 className='text-center font-bold'>ویرایش پروفایل</h1>
            <span></span>
         </div>

         <div className='space-y-10 max-w-md mx-auto'>
            <Formik
               enableReinitialize={true}
               initialValues={{
                  name: data?.name || '',
                  mobile_number: data?.mobile_number || '',
                  phone_number: data?.phone_number || '',
                  melli_code: data?.melli_code || '',
                  address: data?.address || '',
               }}
               validationSchema={ProfileSchemaValidation}
               onSubmit={onSubmit}
            >
               {({ isSubmitting }) => (
                  <Form>
                     <FormikInput
                        label='نام و نام خانوادگی'
                        name='name'
                        type='text'
                        placeholder='لطفا نام و نام خانوادگی خود را وارد کنید...'
                     />
                     <FormikInput
                        label='شماره همراه'
                        name='mobile_number'
                        type='text'
                        placeholder='لطفا شماره همراه خود را وارد کنید...'
                     />
                     <FormikInput
                        label='شماره ثابت'
                        name='phone_number'
                        type='text'
                        placeholder='لطفا شماره ثابت خود را وارد کنید...'
                     />
                     <FormikInput
                        label='کد ملی'
                        name='melli_code'
                        type='text'
                        placeholder='لطفا کد ملی خود را وارد کنید...'
                     />
                     <FormikTextarea
                        label='آدرس محل سکونت'
                        name='address'
                        placeholder='لطفا آدرس محل سکونت خود را وارد کنید...'
                     />
                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='yekan1 bg-blue-500 text-white w-full py-2 rounded-xl'
                     >
                        {isSubmitting ? (
                           <div className='flex justify-center'>
                              <svg
                                 aria-hidden='true'
                                 className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white fill-blue-600'
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
                           'ذخیره تغییرات'
                        )}
                     </button>
                  </Form>
               )}
            </Formik>
         </div>

         <Backdrop
            sx={{
               color: '#fff',
               zIndex: (theme) => theme.zIndex.drawer + 1,
               height: '100vh',
            }}
            open={isLoading}
         >
            <svg
               aria-hidden='true'
               className='w-12 h-12 text-gray-200 animate-spin dark:text-white fill-black'
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
         </Backdrop>
      </div>
   )
}

export default Edit
