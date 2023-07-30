import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
// import _ from 'lodash';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.setAll,
    // addInitialChannels: (state, action) => {
    //   state.data = action.payload;
    // },
    // setCurrentChannel: (state, action) => {
    //   state.currentChannelId = action.payload;
    // },
    // addChannel: (state, action) => {
    //   state.data.push({
    //     id: _.uniqueId(),
    //     name: action.payload,
    //     removable: true,
    //   });
    // },
    // removeChannel: (state, action) => {
    //   state.data.filter((channel) => channel.id !== action.payload);
    // },
  }
});

export const { addChannel, setChannels } = channelsSlice.actions;
// export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
