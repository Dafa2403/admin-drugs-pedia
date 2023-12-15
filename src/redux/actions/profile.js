import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
    name: 'profile',
    initialState: {
        isProfile: null
    },
    reducers: {
        handleProfile: (state, action) => {
            state.isProfile = action.payload
        },
    },
})


export const { handleProfile } = profile.actions;
export default profile.reducer