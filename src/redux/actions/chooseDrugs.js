import { createSlice } from "@reduxjs/toolkit";

const chooseDrugs = createSlice({
    name: 'chooseDrugs',
    initialState: {
        id: null
    },
    reducers: {
        chooseId: (state, action) => {
            state.id = action.payload
        },
    },
})


export const { chooseId } = chooseDrugs.actions;
export default chooseDrugs.reducer