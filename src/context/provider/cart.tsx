'use client'

import { createContext, useReducer, useEffect } from 'react'

import cartReducer from '../reducer/cart';

const CartContext = createContext({});

const cartLocal = JSON.parse(localStorage.getItem('cart'))

const initialState = {
    cart: cartLocal || {},
};

const CartContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state])

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider }; 