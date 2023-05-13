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
    const [selectedColor, selectColor] = useState<string | null>(null)
    const [selectedSize, selectSize] = useState<string | null>(null)

    const { state, dispatch }: any = useContext(CartContext as any)
    const { cart } = state

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
                }} style={{ fontSize: '1.2rem' }} className='from-blue-400 to-blue-200 bg-gradient-to-bl w-full ml-5 rounded-xl font-semibold '>
                    Add
                </button>
            </div>
        </div>
    );
}

export default Options;