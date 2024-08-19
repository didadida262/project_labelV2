
// 同步请求
import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment(state, value) {
            state.count = state.count + value.payload
        },
        decrement(state, value) {
            state.count = state.count - value.payload
        }
    }
})

const { increment, decrement } = counterStore.actions
const reducer = counterStore.reducer

export { increment, decrement}
export default reducer