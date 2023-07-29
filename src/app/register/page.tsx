import BackButton from "@/components/back-btn";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <>
        <div className='my-16 space-y-10 max-w-md mx-auto'>
            <div className='flex justify-between items-center'>
                <BackButton />
                <h1>ثبت نام</h1>
                <span></span>
            </div>
          
            <RegisterForm />
        </div>
    </>
  );
}
