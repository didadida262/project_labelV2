// redux版本的黑白模式配置，未启用


import { createSlice } from "@reduxjs/toolkit";

const lightDarkModeStore = createSlice({
    name: 'lightDarkMode',
    initialState: {
        lightDarkMode: localStorage.getItem('lightDarkMode') || 'light'
    },
    reducers: {
        setLightDarkMode (state, action) {
            state.lightDarkMode = action.payload
        }
    }
})

const reducer = lightDarkModeStore.reducer
const  { setLightDarkMode } = lightDarkModeStore.actions

export default reducer
export { setLightDarkMode }