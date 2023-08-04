import LoginForm from './form'
import User from '@/lib/user'

const LoginPage = async () => {
   const user = await User()
   return (
      <div className='flex h-screen bg-white'>
         <div className='h-full w-full flex justify-center items-center'>
            {user ? <h3 className='text-center'>شما قبلا وارد شده اید</h3> : <LoginForm />}
         </div>
      </div>
   )
}

export default LoginPage
