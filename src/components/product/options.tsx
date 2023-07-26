'use client'

import { useState, useContext, useEffect, useMemo } from "react";

import styles from './Product.module.scss'
import { CartContext } from "@/context/provider/cart";
import { ProductLocation, Color, Size, Image } from "@prisma/client";

type ProductLocationExtended = ProductLocation & {
    id: string
    color: Color
    size: Size
    quantity: number
    discount: number
    price: number
}[]

const Options = ({ product }: {
    product: {
        gallery: Image[]
        productLocation: ProductLocationExtended
        title: string
    }
}) => {
    const [selectedColor, selectColor] = useState(product.productLocation[0].color.color)
    const [selectedSize, selectSize] = useState(product.productLocation[0].size.size)
    const [selectedLocation, selectFinalLocation] = useState(product.productLocation[0])

    const { cart, dispatch }: any = useContext(CartContext as any)

    const cartItems = useMemo(() => {
        return cart;
     }, [cart]);

    useEffect(() => {
        product.productLocation.map((product) => {
            if (selectedColor == product.color.color && selectedSize == product.size.size) selectFinalLocation(product)
        })

    }, [selectedSize, product, selectedColor])

    const colors = () => {
        let list: string[] = []

        return product.productLocation.map(product => {
            if (product.quantity) {
                const color = product.color.color
                
                if (list.includes(color)) return
                else {
                    list.push(color)
                    
                    return (
                        <button key={color} onClick={() => {
                            selectColor(color)
                            selectSize(product.size.size)
                        }}>
                            <span style={{ borderColor: `${selectedColor == color ? color : 'transparent'}` }} className='border-2 p-1 flex rounded-full'>
                                <span style={{ background: color }} className='m-auto block w-6 h-6 rounded-full shadow-[0_0_5px_#a4a4a4]'></span>
                            </span>
                        </button>
                    )
                }
            }
        })
    }

    interface AddToCartReducerType {
        id: string;
        title: string;
        color: string;
        size: number;
        price: number;
        discount: number;
        thumbnail: Image;
        maxQuantity: number;
    }

    const addToCartReducer = (payload: AddToCartReducerType|{id: string}) => {
        if (!selectedLocation.id || !selectedLocation.quantity) return
        
        let available = selectedLocation.quantity
        let addedToCart = cartItems[selectedLocation.id]?.quantity || 0
        
        if (addedToCart < available) {
            dispatch({
                type: "ADD_TO_CART",
                payload: payload
            })
        }

    }

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-right'>رنگ ها</h2>

                <div className='flex space-x-2 justify-end'>
                    {colors()}
                </div>
            </div>

            <div>
                <h2 className='text-right'>سایز</h2>

                <div className='flex space-x-2 justify-end'>
                    {
                        product.productLocation.map(product => {
                            if (product.color.color !== selectedColor || !product.quantity) return

                            const size = product.size.size

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
                <div>
                    {
                        selectedLocation.discount ?
                        <div className='flex justify-between'>
                            <span className='text-slate-400 line-through font-semibold text-sm'>
                                {selectedLocation.price.toLocaleString()}
                            </span>
                            {
                                selectedLocation.discount ?
                                <span className='bg-red-500 rounded-2xl px-2 pt-1 text-white'>
                                    {selectedLocation.discount}%
                                </span>
                                :
                                ''
                            }
                        </div>
                        :
                        ''
                    }
                    <div style={{ fontSize: '2rem' }} className='font-bold toman_product'>
                        {
                            selectedLocation.discount ?
                            (selectedLocation.price - ((selectedLocation.price * selectedLocation.discount) / 100)).toLocaleString()
                            :
                            selectedLocation.price.toLocaleString()
                        }
                    </div>
                </div>

                <div  style={{ fontSize: '1.2rem' }} className='justify-center flex from-blue-400 to-blue-200 bg-gradient-to-bl w-full ml-5 rounded-xl font-semibold '>
                    {
                        Object.keys(cartItems ?? {})?.length &&
                        cartItems[selectedLocation.id]
                            ?
                            <div className='flex items-center justify-around w-full'>
                                <button
                                    onClick={() => {
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: {id: selectedLocation.id}
                                        })
                                    }}
                                >
                                    <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" /></svg>
                                </button>
                                <span className='text-black font-semibold text-lg'>{cartItems[selectedLocation.id].quantity}</span>
                                <button onClick={() => addToCartReducer({id: selectedLocation.id})}>
                                    <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                                </button>
                            </div>
                            :
                            <button onClick={() => addToCartReducer(
                                {
                                id: selectedLocation.id,
                                title: product.title,
                                color: selectedLocation.color.color,
                                size: selectedLocation.size.size,
                                price: selectedLocation.price,
                                discount: selectedLocation.discount,
                                thumbnail: product.gallery[0],
                                maxQuantity: selectedLocation.quantity
                                }
                            )}>
                                <span className='text-black text-base'> افزودن به سبد</span>
                            </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Options;