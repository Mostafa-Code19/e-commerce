'use client'

import { useState, useContext, useEffect } from "react";

import styles  from './Product.module.scss'
import { CartContext } from "@/context/cart";

const Options = ({
    children
  }: {
    children: React.ReactNode
  }) => {
    const [selectedColor, selectColor] = useState<string | null>(null)
    const [selectedSize, selectSize] = useState<string | null>(null)

    const { state, dispatch } = useContext(CartContext as any)
    const { cart } = state

    useEffect(() => {
        console.log(cart)
    }, [cart])

    return (
        <div className='mx-8 space-y-6'>
            {children}

            <h2>Color</h2>
            <div className='flex space-x-2'>
                <button onClick={() => selectColor('black')}>
                    <span style={{borderColor: `${selectedColor=='black'?'black':'transparent'}`}} className='border-2 p-1 flex rounded-full'>
                        <span style={{background: 'black'}} className='m-auto block w-6 h-6 rounded-full'></span>
                    </span>
                </button>

                <button onClick={() => selectColor('green')}>
                    <span style={{borderColor: `${selectedColor=='green'?'green':'transparent'}`}} className='border-2 p-1 flex rounded-full'>
                        <span style={{background: 'green'}} className='m-auto block w-6 h-6 rounded-full'></span>
                    </span>
                </button>
            </div>

            <div>
                <h2>Size</h2>

                <div className='flex space-x-2'>
                    <button
                        onClick={() => selectSize('38')}
                        style={{color: 'green'}}
                        className='flex items-center'
                    >
                        <span
                            className={selectedSize == '38' ? styles.selected_size : styles.size}
                        >
                            38
                        </span>
                    </button>
                    <button
                        onClick={() => selectSize('39')}
                        className='flex items-center'
                    >
                        <span
                            className={selectedSize == '39' ? styles.selected_size : styles.size}
                        >
                            39
                        </span>
                    </button>
                </div>
            </div>

            <div className='flex justify-between'>
                <div style={{fontSize: '2rem'}} className='font-bold'>
                    $400
                </div>

                <button onClick={() => {
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: {
                            id: 'id'
                            // detail
                        }
                    })
                }} style={{fontSize: '1.2rem'}} className='from-blue-400 to-blue-200 bg-gradient-to-bl w-full ml-5 rounded-xl font-semibold '>
                    Add
                </button>
            </div>
        </div>
    );
}
 
export default Options;