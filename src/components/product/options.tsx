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
    const [selectedColor, selectColor] = useState<string>(product.productLocation[0].color.color)
    const [productWithSelectedColor, setProductWithSelectedColor] = useState<any[]>([product.productLocation[0]])
    const [selectedSize, selectSize] = useState<number>(product.productLocation[0].size.size)
    const [productWithSelectedColorAndSize, selectProductWithSelectedColorAndSize] = useState(product.productLocation[0])

    const { state, dispatch }: any = useContext(CartContext as any)
    const { cart } = state

    useEffect(() => {
        let productsBaseSize = null
        let productBaseColor: any = []

        product.productLocation.map((product: any) => {
            if (selectedColor == product.color.color) {
                productBaseColor.push(product)

                if (selectedSize == product.size.size) {
                     return productsBaseSize = product
                }
            }
        })

        setProductWithSelectedColor(productBaseColor)
        selectProductWithSelectedColorAndSize(productsBaseSize)

    }, [selectedSize, product, selectedColor])

    const colors = () => {
        let list: any = []

        return product.productLocation.map((data: any) => {
            if (data.quantity) {
                const color = data.color.color
                
                if (list.includes(color)) return
                else {
                    list.push(color)
                    
                    return (
                        <button key={color} onClick={() => {
                            selectColor(color)
                            selectSize(data.size.size)
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

    const addToCartReducer = (payload) => {
        let available = productWithSelectedColorAndSize.quantity
        let addedToCart = cart[productWithSelectedColorAndSize.id]?.quantity || 0
        
        if (addedToCart < available) {
            dispatch({
                type: "ADD_TO_CART",
                payload: payload
            })
        }
    }

    return (
        <div className='mx-8 space-y-6'>
            {children}

            <h2 className='text-right'>رنگ ها</h2>

            <div className='flex space-x-2 justify-end'>
                {
                    colors()
                }
            </div>

            <div>
                <h2 className='text-right'>Size</h2>

                <div className='flex space-x-2 justify-end'>
                    {
                        productWithSelectedColor?.map((data: any) => {
                            if (data.quantity) {
                                const size = data.size.size
    
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
                            }

                        })
                    }
                </div>
            </div>

            <div className='flex justify-between'>
                <div className=''>
                    {
                        productWithSelectedColorAndSize.discount ?
                        <div className='flex justify-between'>
                            <span className='text-slate-400 line-through font-semibold text-sm'>
                                {productWithSelectedColorAndSize.price.toLocaleString()}
                            </span>
                            {
                                productWithSelectedColorAndSize.discount ?
                                <span className='bg-red-500 rounded-2xl px-2 pt-1 text-white'>
                                    {productWithSelectedColorAndSize.discount}%
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
                            productWithSelectedColorAndSize.discount ?
                            (productWithSelectedColorAndSize.price - ((productWithSelectedColorAndSize.price * productWithSelectedColorAndSize.discount) / 100)).toLocaleString()
                            :
                            productWithSelectedColorAndSize.price.toLocaleString()
                        }
                    </div>
                </div>

                <div  style={{ fontSize: '1.2rem' }} className='justify-center flex from-blue-400 to-blue-200 bg-gradient-to-bl w-full ml-5 rounded-xl font-semibold '>
                    {
                        Object.keys(cart)?.length &&
                        cart[productWithSelectedColorAndSize.id]
                        ?
                        <div className='flex items-center justify-around w-full'>
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: {id: productWithSelectedColorAndSize.id}
                                    })
                                }}
                            >
                                <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" /></svg>
                            </button>
                            <span className='text-black font-semibold text-lg'>{cart[productWithSelectedColorAndSize.id].quantity}</span>
                            <button onClick={() => addToCartReducer({id: productWithSelectedColorAndSize.id})}>
                                <svg className="h-9 w-9 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                            </button>
                        </div>
                        :
                        <button onClick={() => addToCartReducer(
                            {
                            id: productWithSelectedColorAndSize.id,
                            color: productWithSelectedColorAndSize.color.color,
                            size: productWithSelectedColorAndSize.size.size,
                            price: productWithSelectedColorAndSize.price,
                            discount: productWithSelectedColorAndSize.discount,
                            thumbnail: product.gallery[0],
                            maxQuantity: productWithSelectedColorAndSize.quantity
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