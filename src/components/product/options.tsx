'use client'

import { useState, useContext, useEffect, useMemo } from 'react'

import styles from './Product.module.scss'
import { CartContext } from '@/context/provider/cart'
import { ProductLocation, Color, Size, Image } from '@prisma/client'

type ProductLocationExtended = ProductLocation &
   {
      id: string
      color: Color
      size: Size
      quantity: number
      discount: number
      price: number
   }[]

const Options = ({
   product,
}: {
   product: {
      gallery: Image[]
      productLocation: ProductLocationExtended
      title: string
   }
}) => {
   const [selectedColor, selectColor] = useState(product.productLocation[0].color.color)
   const [selectedSize, selectSize] = useState(product.productLocation[0].size.size)
   const [selectedLocation, selectFinalLocation] = useState(product.productLocation[0])

   // @ts-ignore
   const { cart, dispatch } = useContext(CartContext)

   const cartItems = useMemo(() => {
      return cart
   }, [cart])

   useEffect(() => {
      product.productLocation.map((product) => {
         if (selectedColor == product.color.color && selectedSize == product.size.size)
            selectFinalLocation(product)
      })
   }, [selectedSize, product, selectedColor])

   const colors = () => {
      const list: string[] = []

      return product.productLocation.map((product) => {
         if (product.quantity) {
            const color = product.color.color

            if (list.includes(color)) return
            else {
               list.push(color)

               return (
                  <button
                     key={color}
                     onClick={() => {
                        selectColor(color)
                        selectSize(product.size.size)
                     }}
                  >
                     <span
                        style={{
                           borderColor: `${selectedColor == color ? color : 'transparent'}`,
                        }}
                        className='border-2 p-1 flex rounded-full'
                     >
                        <span
                           style={{ background: color }}
                           className='m-auto block w-6 h-6 rounded-full shadow-[0_0_5px_#a4a4a4]'
                        ></span>
                     </span>
                  </button>
               )
            }
         }
      })
   }

   interface AddToCartReducerType {
      id: string
      title: string
      color: string
      size: number
      price: number
      discount: number
      thumbnail: Image
      maxQuantity: number
   }

   const addToCartReducer = (payload: AddToCartReducerType | { id: string }) => {
      if (!selectedLocation.id || !selectedLocation.quantity) return

      const available = selectedLocation.quantity
      const addedToCart = cartItems[selectedLocation.id]?.quantity || 0

      if (addedToCart < available) {
         dispatch({
            type: 'ADD_TO_CART',
            payload: payload,
         })
      }
   }

   return (
      <div className='space-y-6'>
         <div className='grid grid-cols-2 gap-x-5 bg-white rounded-lg px-3 py-4'>
            <div className='from-slate-100 to-white shadow-sm bg-gradient-to-t p-2 rounded-lg'>
               <div className='flex space-x-1 mr-5 overflow-x-scroll styled-scrollbars'>
                  {product.productLocation.map((product) => {
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
                  })}
               </div>
            </div>

            <div className='from-slate-100 to-white shadow-sm bg-gradient-to-t p-2 rounded-lg'>
               <div className='flex space-x-1 mr-5 overflow-x-scroll styled-scrollbars'>
                  {colors()}
               </div>
            </div>
         </div>

         <div className='flex bg-white rounded-lg px-3 py-5 justify-between'>
            <div>
               {selectedLocation.discount ? (
                  <div className='flex justify-between'>
                     <span className='text-slate-400 line-through font-semibold text-sm'>
                        {selectedLocation.price.toLocaleString()}
                     </span>
                     {selectedLocation.discount ? (
                        <span className='bg-red-500 rounded-2xl px-2 pt-1 text-white'>
                           {selectedLocation.discount}%
                        </span>
                     ) : (
                        ''
                     )}
                  </div>
               ) : (
                  ''
               )}
               <div style={{ fontSize: '2rem' }} className='font-bold toman_product'>
                  {selectedLocation.discount
                     ? (
                          selectedLocation.price -
                          (selectedLocation.price * selectedLocation.discount) / 100
                       ).toLocaleString()
                     : selectedLocation.price.toLocaleString()}
               </div>
            </div>

            <div
               style={{ fontSize: '1.2rem' }}
               className='justify-center flex from-slate-200 to-white shadow-lg bg-gradient-to-t w-full ml-5 rounded-xl font-semibold '
            >
               {Object.keys(cartItems ?? {})?.length && cartItems[selectedLocation.id] ? (
                  <div className='flex items-center justify-around w-full'>
                     <button
                        onClick={() => {
                           dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: { id: selectedLocation.id },
                           })
                        }}
                     >
                        <svg
                           className='h-7 w-7 text-black'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <line x1='5' y1='12' x2='19' y2='12' />
                        </svg>
                     </button>
                     <span className='text-black font-semibold text-2xl'>
                        {cartItems[selectedLocation.id].quantity}
                     </span>
                     <button onClick={() => addToCartReducer({ id: selectedLocation.id })}>
                        <svg
                           className='h-7 w-7 text-black'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <line x1='12' y1='5' x2='12' y2='19' />{' '}
                           <line x1='5' y1='12' x2='19' y2='12' />
                        </svg>
                     </button>
                  </div>
               ) : (
                  <button
                     onClick={() =>
                        addToCartReducer({
                           id: selectedLocation.id,
                           title: product.title,
                           color: selectedLocation.color.color,
                           size: selectedLocation.size.size,
                           price: selectedLocation.price,
                           discount: selectedLocation.discount,
                           thumbnail: product.gallery[0],
                           maxQuantity: selectedLocation.quantity,
                        })
                     }
                  >
                     <span className='text-black text-base'> افزودن به سبد</span>
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

export default Options
