'use client'

import { useState, useContext, useEffect } from "react";

import styles from './Product.module.scss'
import { CartContext } from "@/context/provider/cart";

const Options = ({
    children,
    product
}: {
    children: React.ReactNode,
    product: any
}) => {
    const [selectedColor, selectColor] = useState<string>(product.colors[0].color)
    const [selectedSize, selectSize] = useState<string>(product.sizes[0].size)

    const { state, dispatch }: any = useContext(CartContext as any)
    const { cart } = state

    const reducerPayload = {
        title: product.title,
        color: selectedColor,
        size: selectedSize
    }

    return (
        <div className='mx-8 space-y-6'>
            {children}

            <h2>Color</h2>
            <div className='flex space-x-2'>
                {
                    product.colors.map((data: any) => {
                        const color = data.color

                        return (
                            <button key={color} onClick={() => selectColor(color)}>
                                <span style={{ borderColor: `${selectedColor == color ? color : 'transparent'}` }} className='border-2 p-1 flex rounded-full'>
                                    <span style={{ background: color }} className='m-auto block w-6 h-6 rounded-full'></span>
                                </span>
                            </button>
                        )
                    })
                }
            </div>

            <div>
                <h2>Size</h2>

                <div className='flex space-x-2'>
                    {
                        product.sizes.map((data: any) => {
                            const size = data.size

                            return (
                                <button
                                    key={size}
                                    onClick={() => selectSize(size)}
                                    style={{ color: 'green' }}
                                    className='flex items-center'
                                >
                                    <span
                                        className={selectedSize == size ? styles.selected_size : styles.size}
                                    >
                                        {size}
                                    </span>
                                </button>
                            )
                        })
                    }
                </div>
            </div>

            <div className='flex justify-between'>
                <div style={{ fontSize: '2rem' }} className='font-bold toman_product'>
                    {product.price.toLocaleString()}
                </div>

                <div  style={{ fontSize: '1.2rem' }} className='justify-center flex from-blue-400 to-blue-200 bg-gradient-to-bl w-full ml-5 rounded-xl font-semibold '>
                    {
                        Object.keys(cart).length &&
                        cart[`${product.title}_${selectedColor}_${selectedSize}`]
                        ?
                        <div className='flex items-center justify-around w-full'>
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: reducerPayload
                                    })
                                }}
                            >
                                <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" /></svg>
                            </button>
                            <span className='text-black font-semibold text-base'>{cart[`${product.title}_${selectedColor}_${selectedSize}`].quantity}</span>
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: reducerPayload
                                    })
                                }}
                            >
                                <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                            </button>
                        </div>
                        :
                        <button onClick={() => {
                            dispatch({
                                type: "ADD_TO_CART",
                                payload: {
                                    id: product.id,
                                    title: product.title,
                                    color: selectedColor,
                                    size: selectedSize,
                                    price: product.price,
                                    thumbnail: product.thumbnail
                                }
                            })
                        }}>
                            Add
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Options;