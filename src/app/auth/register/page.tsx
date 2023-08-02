import BackButton from '@/components/back-btn'
import { RegisterForm } from './form'
import User from '@/lib/user'

const RegisterPage = async () => {
   const user = await User()

   return (
      <div className='my-16 space-y-10 max-w-md mx-auto'>
         <div className='flex justify-between items-center'>
            <BackButton />
            <h1>ثبت نام</h1>
            <span></span>
         </div>

         {user ? <h3 className='text-center'>شما قبلا وارد شده اید</h3> : <RegisterForm />}
      </div>
   )
}

export default RegisterPage
