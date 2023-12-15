import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
    name: 'show',
    initialState: {
        show: true
    },
    reducers: {
        toggleNavigation: (state, action) => {
            state.show = action.payload
        },
    },
})


export const { toggleNavigation } = showSlice.actions;
export default showSlice.reducer