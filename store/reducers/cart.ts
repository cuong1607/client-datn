import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductStoreType } from "types";

interface CartTypes {
  cartItems: ProductStoreType[];
}

const initialState = {
  cartItems: [],
} as CartTypes;

const indexSameProduct = (state: CartTypes, action: ProductStoreType) => {
  console.log("action", action);

  const sameProduct = (product: ProductStoreType) =>
    product.id === action.id && product.color === action.color;

  return state.cartItems.findIndex(sameProduct);
};

type AddProductType = {
  product: ProductStoreType;
  amount: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductType>) => {
      const cartItems = state.cartItems;

      // find index of product
      const index = indexSameProduct(state, action.payload.product);

      if (index !== -1) {
        cartItems[index].amount += action.payload.amount;
        return;
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.product],
      };
    },
    removeProduct(state, action: PayloadAction<ProductStoreType>) {
      // find index of product
      state.cartItems.splice(indexSameProduct(state, action.payload), 1);
    },
    setCount(state, action: PayloadAction<AddProductType>) {
      // find index and add new count on product count
      const indexItem = indexSameProduct(state, action.payload.product);
      state.cartItems[indexItem].amount = action.payload.amount;
    },
    removeProductAll: (state) => {
      console.log('log', state);
      state.cartItems = [];
    },
  },
});

export const { addProduct, removeProduct, setCount, removeProductAll } =
  cartSlice.actions;
export default cartSlice.reducer;
