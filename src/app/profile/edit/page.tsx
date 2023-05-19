import BackButton from "@/components/back-btn";
import User from "@/lib/user";

const Edit = async () => {
    const user = await User()

    return (
        <div className='mx-8 my-16 space-y-11'>
            <div className='flex justify-between items-center'>
                <BackButton />
                <h1 className='text-center font-bold'>ویرایش پروفایل</h1>
                <span></span>
            </div>

            <div className='space-y-10'>
                <div className='flex justify-between items-center'>
                    <input type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.name} />
                    <span className='text-base text-black'>نام و نام خانوادگی</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.mobile_number} />
                    <span className='text-base text-black'>تلفن همراه</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.phone_number} />
                    <span className='text-base text-black'>تلفن منزل</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.melli_code} />
                    <span className='text-base text-black'>کد ملی</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.email} />
                    <span className='text-base text-black'>ایمیل</span>
                </div>

                <div className='flex justify-between items-center'>
                    <textarea rows={3} className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user.address} />
                    <span className='text-base text-black'>آدرس محل سکونت</span>
                </div>
            </div>

            <div className='flex yekan1 justify-center bg-blue-400 text-white w-full py-2 rounded-xl'>
                <button>
                    ذخیره تغییرات
                </button>
            </div>

        </div>
    );
}
 
export default Edit;