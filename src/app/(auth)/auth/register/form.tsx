'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

import RegisterSchemaValidation from '@/formik/schema/register'
import FormikInput from '@/formik/input'
import Link from 'next/link'

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

         if (!res.ok) throw new Error()
         if (resData.status === 500) throw new Error('405')

         toast.success('ثبت نام شما با موفقیت انجام شد. لطفا منتظر بمانید....')
         return signIn('credentials', {
            ...values,
            callbackUrl: '/profile',
         })
      } catch (err) {
         // @ts-ignore
         if (err?.message == '405') {
            toast.warning('این ایمیل از قبل ثبت نام شده است')
         } else {
            toast.error('در ثبت نام شما خطایی رخ داد')
            console.error('api/auth/register err', err)
         }
      }

      // const errorMessage = err.response.data.message
   }

   const QontoConnector = styled(StepConnector)(() => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
         top: 10,
         right: 'calc(-50% + 16px)',
         left: 'calc(50% + 16px)',
         margin: '0 .5rem',
      },
   }))

   const steps = ['احراز هویت', 'تکمیل اطلاعات', 'ثبت سفارش']

   return (
      <div className='text-center w-full max-w-sm'>
         <Stepper
            activeStep={0}
            sx={{ direction: 'rtl', marginBottom: '5rem' }}
            alternativeLabel
            connector={<QontoConnector />}
         >
            {steps.map((label) => (
               <Step key={label}>
                  <StepLabel>
                     <h6>{label}</h6>
                  </StepLabel>
               </Step>
            ))}
         </Stepper>

         <h1>تبریزیان ایکامرس</h1>

         <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchemaValidation}
            onSubmit={onSubmit}
         >
            {({ isSubmitting }) => (
               <Form className='mt-4'>
                  <div>
                     <h3 className='text-right mb-3'>ثبت نام</h3>
                     <p className='text-right text-sm'>
                        ! سلام <br /> برای ثبت نام لطفا ایمیل، رمز و تکرار رمز خود را وارد کنید
                     </p>
                  </div>

                  <div className='space-y-3 mt-5 mb-10'>
                     <FormikInput
                        label=''
                        name='email'
                        type='email'
                        placeholder='ایمیل خود را وارد کنید...'
                     />
                     <FormikInput
                        label=''
                        name='password'
                        type='password'
                        placeholder='رمز عبور خود را وارد کنید...'
                     />
                     <FormikInput
                        label=''
                        name='confirmPassword'
                        type='password'
                        placeholder='مجدد رمز عبور خود را وارد کنید...'
                     />
                  </div>
                  <button
                     type='submit'
                     className='rounded-xl w-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg shadow-indigo-300 text-white'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <div className='flex justify-center'>
                           <CircularProgress color='inherit' size={25} />
                        </div>
                     ) : (
                        'ثبت نام'
                     )}
                  </button>
               </Form>
            )}
         </Formik>

         <div className='text-green-900 text-center mt-10'>
            <Link href='/auth/login'>
               <h6 className='font-semibold underline underline-offset-4'>
                  حساب کاربری داريد؟ اینجا وارد شوید
               </h6>
            </Link>
         </div>
      </div>
   )
}
