import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { setCart } from "../cartStorage";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
store.subscribe(() => {
  const state = store.getState();
  setCart(state.cart.items, 'redux');
});