'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '@prisma/client'

import BackButton from "@/components/back-btn";

const Edit = () => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const mobileNumberRef = useRef<HTMLInputElement>(null)
    const phoneNumberRef = useRef<HTMLInputElement>(null)
    const melliCodeRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLTextAreaElement>(null)

    const fetchUser = async () => {
        return await axios.get('/api/user')
            .then(res => {
                setUser(res.data.user);
            })
    }

    useEffect(() => {
        document.title = 'فروشگاه اینترنتی | ویرایش پروفایل'
        fetchUser()
    }, [])

    const submit = async () => {
        setLoading(true)

        let payload: {
            name?: string
            mobile_number?: string
            phone_number?: string
            melli_code?: string
            address?: string
        } = {}

        const name = nameRef.current?.value
        const mobileNumber = mobileNumberRef.current?.value
        const phoneNumber = phoneNumberRef.current?.value
        const melliCode = melliCodeRef.current?.value
        const address = addressRef.current?.value

        if (name) payload.name = name
        if (mobileNumber) payload.mobile_number = mobileNumber
        if (phoneNumber) payload.phone_number = phoneNumber
        if (melliCode) payload.melli_code = melliCode
        if (address) payload.address = address

        const payloadLength = Object.keys(payload).length
        if (payloadLength) {
            try {
                const res = await axios.patch('/api/user/update', payload)

                if (res.data.user) {
                    toast.success('تغییرات با موفقیت ثبت گردید.');
                } else throw new Error("500")

            } catch (err) {
                toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.');
                console.log('user/update', err)
            }
        }

        setLoading(false)
    }

    return (
        <div className='mx-8 my-16 space-y-11'>
            <div className='flex justify-between items-center'>
                <BackButton />
                <h1 className='text-center font-bold'>ویرایش پروفایل</h1>
                <span></span>
            </div>

            <div className='space-y-10'>
                <div className='flex justify-between items-center'>
                    <input
                        ref={nameRef}
                        name='name' type="text"
                        className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black'
                        placeholder={nameRef.current?.value || user?.name || ''}
                    />
                    <label className='text-base text-black' htmlFor="name">نام و نام خانوادگی</label>
                </div>

                <div className='flex justify-between items-center'>
                    <input
                        ref={mobileNumberRef}
                        name='mobileNumber' type="text"
                        className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black'
                        placeholder={mobileNumberRef.current?.value || user?.mobile_number || ''}
                    />
                    <label htmlFor='mobileNumber' className='text-base text-black'>تلفن همراه</label>
                </div>

                <div className='flex justify-between items-center'>
                    <input
                        ref={phoneNumberRef}
                        name='phoneNumber' type="text"
                        className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black'
                        placeholder={phoneNumberRef.current?.value || user?.phone_number || ''}
                    />
                    <label htmlFor='phoneNumber' className='text-base text-black'>تلفن منزل</label>
                </div>

                <div className='flex justify-between items-center'>
                    <input
                        ref={melliCodeRef}
                        name='melliCode' type="text"
                        className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black'
                        placeholder={melliCodeRef.current?.value || user?.melli_code || ''}
                    />
                    <label htmlFor='melliCode' className='text-base text-black'>کد ملی</label>
                </div>

                <div className='flex justify-between items-center'>
                    <textarea
                        ref={addressRef}
                        rows={3}
                        className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black'
                        placeholder={addressRef.current?.value || user?.address || ''}
                    />
                    <label className='text-base text-black'>آدرس محل سکونت</label>
                </div>
            </div>

            <div className='flex yekan1 justify-center bg-blue-400 text-white w-full py-2 rounded-xl'>
                {
                    loading ?
                        <div>
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        :
                        <button onClick={() => submit()} disabled={loading}>
                            ذخیره تغییرات
                        </button>
                }
            </div>

        </div>
    );
}

export default Edit;