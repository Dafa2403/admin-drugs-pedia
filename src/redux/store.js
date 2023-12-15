import { configureStore } from "@reduxjs/toolkit";
import showReducer from './actions/toggleSlice';
import loginSlice from "./actions/loginSlice";
import access from "./actions/access";
import profile from "./actions/profile";
import locate from "./actions/locate";
import chooseDrugs from "./actions/chooseDrugs";

const store = configureStore({
    reducer: { 
        show: showReducer, 
        login: loginSlice,
        access: access,
        profile: profile,
        locate: locate,
        choose: chooseDrugs
    }
})

console.log("🚀 ~ file: store.js:7 ~ store:", store.getState())


store.subscribe(() => {
    console.log("store change : ", store.getState())
})

export default store