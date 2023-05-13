'use client'

import { useReducer, createContext } from "react";

// initial state
const initialState = {
  cart: {},
};

const CartContext = createContext({});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart[action.payload.id];
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.id]: item ? {
            ...item,
            quantity: item.quantity + 1,
          } : {
            ...action.payload,
            quantity: 1,
          }
        }
      }
    case "REMOVE_FROM_CART":
      let newCart = { ...state.cart };
      delete newCart[action.payload.id];
      return {
        ...state,
        cart: newCart,
      }
    default:
      return state;
  }
}

// context provider
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider }; 