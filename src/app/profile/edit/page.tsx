'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

import BackButton from "@/components/back-btn";

type User = {
    address: string
    blocked: boolean
    blocked_for: string
    created_at: string
    email:  string
    email_verified: boolean
    id: string
    image: string
    last_login: string
    melli_code: string
    mobile_number: string
    mobile_verified: boolean
    name: string
    phone_number: string
    updated_at: string
}

const Edit = () => {
    const [user, setUser] = useState<any>()
    const nameRef = useRef<HTMLInputElement>(null)
    const mobileNumberRef = useRef<HTMLInputElement>(null)
    const phoneNumberRef = useRef<HTMLInputElement>(null)
    const melliCodeRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLTextAreaElement>(null)

    const fetchUser = useCallback(async () => {
        const user = await new Promise(async (resolve) => {
            const res = await axios.get('/api/user');
            // res.data => {authenticated:boolean, user: {...}}\
            resolve(res.data.user);
        })

        setUser(user)
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    let submitPermission = true
    const submit = async () => {
        if (!submitPermission) return

        submitPermission = false
        let payload: any = {}

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
            await axios.patch('/api/user/update', payload)
                .then(res => {
                    // push message
                    window.location.reload()
                })
                .catch(err => {
                    console.log('user/update', err)
                    submitPermission = true
                })
        }
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
                    <input ref={nameRef} type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user?.name} />
                    <span className='text-base text-black'>نام و نام خانوادگی</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input ref={mobileNumberRef} type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user?.mobile_number} />
                    <span className='text-base text-black'>تلفن همراه</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input ref={phoneNumberRef} type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user?.phone_number} />
                    <span className='text-base text-black'>تلفن منزل</span>
                </div>

                <div className='flex justify-between items-center'>
                    <input ref={melliCodeRef} type="text" className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user?.melli_code} />
                    <span className='text-base text-black'>کد ملی</span>
                </div>

                <div className='flex justify-between items-center'>
                    <textarea ref={addressRef} rows={3} className='placeholder:text-slate-400 px-1 py-1 border-b bg-transparent border-black' placeholder={user?.address} />
                    <span className='text-base text-black'>آدرس محل سکونت</span>
                </div>
            </div>

            <div className='flex yekan1 justify-center bg-blue-400 text-white w-full py-2 rounded-xl'>
                <button onClick={() => submit()}>
                    ذخیره تغییرات
                </button>
            </div>

        </div>
    );
}
 
export default Edit;