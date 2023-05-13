import Image from 'next/image'

import BackButton from "../../components/back-button";

const Cart = () => {
    return (

        <div className='mx-8 space-y-6'>
            <div className='flex items-center justify-between'>
                <BackButton />
                <h1>Cart</h1>
                <span></span>
            </div>

            <div>
                <div className='flex justify-around bg-white rounded-xl py-8 space-y-3'>
                    <div className='space-y-3'>
                        <h2>Jordan Classic</h2>
                        <h2>$ 99.5</h2>
                        <div className='flex items-center space-x-2'>
                            <button>
                                <svg className="h-7 w-7 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" /></svg>
                            </button>
                            <span className='text-black font-semibold text-base'>1</span>
                            <button>
                                <svg className="h-7 w-7 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <Image
                            className='object-cover justify-center m-auto p-2'
                            src="/product/3.png"
                            alt="nike shoe"
                            width='200'
                            height='200'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;