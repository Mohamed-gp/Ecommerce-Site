import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [],
  },
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    addToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item: any) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.product._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
