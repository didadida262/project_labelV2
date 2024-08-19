import { createSlice } from "@reduxjs/toolkit";
import api from '../../axios'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || ''
    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        }
    }
})

const reducer = userStore.reducer
const  { setToken } = userStore.actions

const fetchToken = (data) => {
    return async (dispatch) => {
      const res = await api.post('/signIn', data) as any
      dispatch(setToken(res.token))
      localStorage.setItem('token', res.token)
    }
}

export default reducer
export { setToken, fetchToken}