import { createSlice } from "@reduxjs/toolkit";





const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null
    },

    reducers : {
        login (state,action) {
            state.user = null
        },
    }
})

export const {login } = authSlice.actions
export default authSlice.reducer