'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'

import FormikInput from '@/formik/input'
import { LoginSchemaValidation } from '@/formik/schema/validation'
import CircularProgress from '@mui/material/CircularProgress'

interface FormType {
   email: string
   password: string
}

const errorsInPersian: { [key: string]: string } = {
   Signin: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   OAuthSignin: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   OAuthCallback: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   OAuthCreateAccount: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   EmailCreateAccount: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   Callback: 'لطفا از ایمیل دیگری برای ورود استفاده کنید..',
   EmailSignin: 'لطفا ایمیل خود رو بررسی کنید',
   CredentialsSignin: 'در ورود شما خطایی رخ داد. لطفا صحت اطلاعات خود را بررسی کنید.',
   default: 'امکان ورود نمی‌باشد',
}

const steps = ['احراز هویت', 'تکمیل اطلاعات', 'ثبت سفارش']

const LoginForm = () => {
   const router = useRouter()

   const [error, setError] = useState('')

   const onSubmit = async (values: FormType) => {
      try {
         const res = await signIn('credentials', {
            ...values,
            redirect: false,
         })

         if (res?.status == 200) {
            if (res.error) return setError(errorsInPersian[res.error])
            router.refresh()
            router.push('/profile')
         } else {
            toast.error('در ورود شما خطایی رخ داد')
            return console.error('auth/login signIn() res !200', res)
         }
      } catch (err) {
         toast.error('در ورود شما خطایی رخ داد')
         return console.error('auth/login signIn() err', err)
      }
   }

   const QontoConnector = styled(StepConnector)(() => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
         top: 10,
         right: 'calc(-50% + 16px)',
         left: 'calc(50% + 16px)',
         margin: '0 .5rem',
      },
   }))

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
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchemaValidation}
            onSubmit={onSubmit}
         >
            {({ isSubmitting }) => (
               <Form className='mt-4'>
                  <div>
                     <h3 className='text-right mb-3'>ورود</h3>
                     <p className='text-right text-sm'>
                        ! سلام <br /> برای ورود ایمیل و رمز خود را وارد کنید
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
                        'ورود'
                     )}
                  </button>
                  {error ? <p className='text-red-500 text-sm mt-3 font-semibold'>{error}</p> : ''}
               </Form>
            )}
         </Formik>

         <div className='text-green-900 text-center mt-10'>
            <Link href='/auth/register'>
               <h6 className='font-semibold underline underline-offset-4'>
                  حساب کاربری ندارید؟ برای اینجا کلیک کنید
               </h6>
            </Link>
         </div>
      </div>
   )
}

export default LoginForm
