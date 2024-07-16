import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  },

  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state, action) {
      state.user = null;
      localStorage.removeItem("user");
    },
    addTocart(state, action) {
      let index = -1;
      const isExist = state.user.cart.find(
        (el) => el.product._id == action.payload._id
      );
      if (!isExist) {
        state.user.cart.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.user.cart.map((el, ind) => {
          if (el.product._id == action.payload._id) {
            index = ind;
          }
        });
        state.user.cart[index].quantity++;
      }
      localStorage.setItem("user", JSON.stringify(state.user));
      /*
      user
      product
      quantity
      */
    },
    removeFromCart(state, action) {
      state.user.cart = state.user.cart.filter((ele) => ele.product._id != action.payload);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});
const authActions = authSlice.actions;
export { authActions };
export default authSlice.reducer;
