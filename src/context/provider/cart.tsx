'use client'

import { createContext, useReducer, useEffect, useState } from 'react'

import { CartReducer, initialState } from '../reducer/cart';

const CartContext = createContext({});

const CartContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cart") || '{}')) {
            dispatch({
                type: "initLocalStorage",
                value: JSON.parse(localStorage.getItem("cart") || '{}'),
            });
        }
    }, []);

    useEffect(() => {
        if (state !== initialState) {
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider }; 