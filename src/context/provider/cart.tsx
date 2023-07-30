"use client";

import { createContext, useReducer, useEffect } from "react";

import { CartReducer, initialCart } from "../reducer/cart";

const CartContext = createContext({});

const CartContextProvider = ({ children }: any) => {
   const [cart, dispatch] = useReducer(CartReducer, initialCart);

   useEffect(() => {
      if (JSON.parse(localStorage.getItem("cart") || "{}")) {
         dispatch({
            type: "initLocalStorage",
            value: JSON.parse(localStorage.getItem("cart") || "{}"),
         });
      }
   }, []);

   useEffect(() => {
      if (cart !== initialCart) {
         localStorage.setItem("cart", JSON.stringify(cart));
      }
   }, [cart]);

   return (
      <CartContext.Provider value={{ cart, dispatch }}>
         {children}
      </CartContext.Provider>
   );
};

export { CartContext, CartContextProvider };
