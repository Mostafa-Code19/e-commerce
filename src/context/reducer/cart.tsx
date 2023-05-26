const cartReducer = (state: any, action: any) => {
  const id = action.payload?.id

  const item = state.cart[id];

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [id]: item ?
          {
            ...item,
            quantity: item.quantity + 1,
          }
          :
          {
            ...action.payload,
            quantity: 1,
          }
        }
      }
    case "REMOVE_FROM_CART":
      if (item.quantity == 1) {
        let newCart = { ...state.cart };
        delete newCart[id];

        return {
          ...state,
          cart: newCart,
        }
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            [id]: {
              ...item,
              quantity: item.quantity - 1,
            }
          }
        }
      }
    case "RESET":
      return {cart: {}}

    default:
      return state;
  }
}

export default cartReducer