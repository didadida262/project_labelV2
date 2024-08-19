// 异步请求

import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const channelStore = createSlice({
    name: 'counterAsync',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannelList(state, action) {
            state.channelList = action.payload;
        }
    }
})

const reducer = channelStore.reducer
const { setChannelList } = channelStore.actions

const fetchData = () => {
    return async (dispatch) => {
      const response = await axios.get('/api/v1/dataSource');
      const data = response.data.result
      console.log('data>>>', data)
      dispatch(setChannelList(data.users))
    }
}

export { fetchData }
export default reducer