import { createSlice } from "@reduxjs/toolkit";

const access = createSlice({
    name: 'access',
    initialState: {
        isToken: null
    },
    reducers: {
        accessToken: (state, action) => {
            state.isToken = action.payload
        },
    },
})


export const { accessToken } = access.actions;
export default access.reducer