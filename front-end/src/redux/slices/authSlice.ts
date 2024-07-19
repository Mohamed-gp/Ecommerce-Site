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
    setCart(state, action) {
      let userParsed = JSON.parse(localStorage.getItem("user") as string);
      userParsed.cart = action.payload;
      state.user = userParsed;
      localStorage.setItem("user", JSON.stringify(userParsed));
    },
    setWishlist(state, action) {
      state.user.wishlist = action.payload;
      let userParsed = JSON.parse(localStorage.getItem("user") as string);
      userParsed.wishlist = action.payload;
      state.user = userParsed;
      localStorage.setItem("user", JSON.stringify(userParsed));
    },
  },
});
const authActions = authSlice.actions;
export { authActions };
export default authSlice.reducer;
