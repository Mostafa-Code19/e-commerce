'use client'

import { createContext, useReducer } from 'react'

import cartReducer from '../reducer/cart';

const CartContext = createContext({});

const initialState = {
    cart: {},
};

const CartContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider }; 