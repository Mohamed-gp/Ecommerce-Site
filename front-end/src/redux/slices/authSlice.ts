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
      localStorage.removeItem("user")
    },
  },
});
const authActions = authSlice.actions;
export { authActions };
export default authSlice.reducer;
