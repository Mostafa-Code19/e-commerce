type CartItemType = {
   [key: string]: {
      color: string;
      discount: number;
      id: string;
      maxQuantity: number;
      price: number;
      quantity: number;
      size: number;
      thumbnail: {
         alt: string;
         src: string;
      };
      title: string;
   };
};

export default CartItemType;
