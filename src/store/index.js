import { configureStore } from "@reduxjs/toolkit";
import userReducer from './mouduls/user'
// import lightDarkModeReducer from './mouduls/lightDarkMode'

const store = configureStore({
    reducer: {
        user: userReducer,
        // lightDarkMode: lightDarkModeReducer
    }
})

export default store