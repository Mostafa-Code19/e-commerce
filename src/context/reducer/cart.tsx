const cartReducer = (state: any, action: any) => {
  const title = action.payload.title
  const color = action.payload.color
  const size = action.payload.size

  const item = state.cart[`${title}_${color}_${size}`];

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [`${title}_${color}_${size}`]: item ?
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
        delete newCart[`${title}_${color}_${size}`];

        return {
          ...state,
          cart: newCart,
        }
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            [`${title}_${color}_${size}`]: {
              ...item,
              quantity: item.quantity - 1,
            }
          }
        }
      }

    default:
      return state;
  }
}

export default cartReducer