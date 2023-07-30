import CartItemType from "@/types/type.cartItems";

export const initialCart = {};

export const CartReducer = (cart: CartItemType, action: any) => {
   const id = action.payload?.id;

   const item = cart[id];

   switch (action.type) {
      case "initLocalStorage":
         return action.value;

      case "ADD_TO_CART":
         return {
            ...cart,
            [id]: item
               ? {
                    ...item,
                    quantity: item.quantity + 1,
                 }
               : {
                    ...action.payload,
                    quantity: 1,
                 },
         };

      case "REMOVE_FROM_CART":
         if (item.quantity == 1) {
            const { [item.id]: _, ...updatedCart } = cart;
            return updatedCart;
         } else {
            return {
               ...cart,
               [id]: {
                  ...item,
                  quantity: item.quantity - 1,
               },
            };
         }

      case "RESET":
         return {};

      default:
         return cart;
   }
};
