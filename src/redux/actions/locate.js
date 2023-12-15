import { createSlice } from "@reduxjs/toolkit";

const locate = createSlice({
    name: 'locate',
    initialState: {
        locateHere: null
    },
    reducers: {
        isLocate: (state, action) => {
            state.locateHere = action.payload
        },
    },
})


export const { isLocate } = locate.actions;
export default locate.reducer