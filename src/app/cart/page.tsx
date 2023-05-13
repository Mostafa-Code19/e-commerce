'use client'

import Image from 'next/image'
import { useState, useContext, useEffect } from "react";

import BackButton from "../../components/back-button";
import { CartContext } from "@/context/provider/cart";

const Cart = () => {
    const { state, dispatch }: any = useContext(CartContext as any)
    const { cart } = state

    return (

        <div className='mx-8 space-y-6'>
            <div className='flex items-center justify-between'>
                <BackButton />
                <h1>Cart</h1>
                <span></span>
            </div>

            <div>
                {
                    cart &&
                    Object.keys(cart).map((key) => {
                        const item = cart[key]

                        return (
                            <div key={item.id} className='flex justify-around bg-white rounded-xl py-8 space-y-3'>
                                <div className='space-y-3'>
                                    <h2>{item.title}</h2>
                                    <h2 className='toman_card'>{(item.price * item.quantity).toLocaleString()}</h2>
                                    <div className='flex items-center space-x-2'>
                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: {
                                                        title: item.title,
                                                    }
                                                })
                                            }}
                                        >
                                            <svg className="h-7 w-7 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" /></svg>
                                        </button>
                                        <span className='text-black font-semibold text-base'>{item.quantity}</span>
                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: "ADD_TO_CART",
                                                    payload: {
                                                        title: item.title,
                                                    }
                                                })
                                            }}
                                        >
                                            <svg className="h-7 w-7 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        className='object-cover justify-center m-auto p-2'
                                        src={`/product/${item.thumbnail}`}
                                        alt={item.title}
                                        width='200'
                                        height='200'
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Cart;