import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../cartStorage"; 
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCart(),
  },
  reducers: {
    syncFromStorage: function (state) {
      state.items = getCart();
    },
    reduxAddToCart: function (state, action) {
      const product = action.payload.product;
      let quantity = action.payload.quantity;
      if (quantity === undefined) {
        quantity = 1;
      }
      const existing = state.items.find(function (i) {
        return i.id.toString() === product.id.toString();
      });
      if (existing) {
        existing.quantity = (existing.quantity || 1) + quantity;
      } else {
        state.items.push({ ...product, quantity: quantity });
      }
    },
    reduxUpdateQuantity: function (state, action) {
      const id = action.payload.id;
      const delta = action.payload.delta;
      const item = state.items.find(function (i) {
        return i.id.toString() === id.toString();
      });
      if (item) {
        const newQty = (item.quantity || 1) + delta;
        if (newQty < 1) {
          item.quantity = 1;
        } else {
          item.quantity = newQty;
        }
      }
    },
    reduxRemoveFromCart: function (state, action) {
      const id = action.payload;
      state.items = state.items.filter(function (i) {
        return i.id.toString() !== id.toString();
      });
    },
    reduxClearCart: function (state) {
      state.items = [];
    },
  },
});
export const {
  syncFromStorage,
  reduxAddToCart,
  reduxUpdateQuantity,
  reduxRemoveFromCart,
  reduxClearCart,
} = cartSlice.actions;
export function selectCartItems(state) {
  return state.cart.items;
}
export function selectTotalItems(state) {
  let total = 0;
  state.cart.items.forEach(function (item) {
    total += item.quantity || 1;
  });
  return total;
}
export function selectSubTotal(state) {
  let total = 0;
  state.cart.items.forEach(function (item) {
    total += item.price * (item.quantity || 1);
  });
  return total;
}
export default cartSlice.reducer;