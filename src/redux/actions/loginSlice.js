import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
    name: 'login',
    initialState: {
        isLogin: false
    },
    reducers: {
        handleLogin: (state, action) => {
            state.isLogin = action.payload
        },
    },
})


export const { handleLogin } = login.actions;
export default login.reducer