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

const authAction = authSlice.actions
const authReducer = authSlice.reducer
export {authAction,authReducer}