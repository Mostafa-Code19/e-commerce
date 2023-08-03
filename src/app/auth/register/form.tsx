'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'

import RegisterSchemaValidation from '@/formik/schema/register'
import FormikInput from '@/formik/input'

interface FormType {
   email: string
   password: string
   confirmPassword: string
}

export const RegisterForm = () => {
   const onSubmit = async (values: FormType) => {
      try {
         const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(values),
         })

         const resData = await res.json()

         if (!res.ok ) throw new Error()
         if (resData.status === 500) throw new Error('405')

         toast.success('ثبت نام شما با موفقیت انجام شد. لطفا منتظر بمانید....')
         return signIn('credentials', {
            ...values,
            callbackUrl: '/profile',
         })
      } catch (err: any) {
         if (err?.message == '405') {
            toast.warning('این ایمیل از قبل ثبت نام شده است')
         } else {
            toast.error('در ثبت نام شما خطایی رخ داد')
            console.log('api/auth/register err', err)
         }
      }

      // const errorMessage = err.response.data.message

   }

   return (
      <div className='border-2 border-white rounded-xl p-4'>
         <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchemaValidation}
            onSubmit={onSubmit}
         >
            {({ isSubmitting }) => (
               <Form className='space-y-4'>
                  <FormikInput
                     label='ایمیل'
                     name='email'
                     type='email'
                     placeholder='ایمیل خود را وارد کنید...'
                  />
                  <FormikInput
                     label='رمزعبور'
                     name='password'
                     type='password'
                     placeholder='رمز عبور خود را وارد کنید'
                  />
                  <FormikInput
                     label='تکرار رمزعبور'
                     name='confirmPassword'
                     type='password'
                     placeholder='مجدد رمز عبور خود را وارد کنید'
                  />
                  <button
                     type='submit'
                     className='rounded-xl w-full bg-blue-500 text-white'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <div className='flex justify-center'>
                           <svg
                              aria-hidden='true'
                              className='w-6 h-6 text-gray-200 animate-spin dark:text-white fill-blue-900'
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
                        'ثبت نام'
                     )}
                  </button>
               </Form>
            )}
         </Formik>
      </div>
   )
}
