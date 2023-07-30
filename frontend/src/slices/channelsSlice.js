import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {
  data: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addInitialChannels: (state, action) => {
      state.data = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.data.push({
        id: _.uniqueId(),
        name: action.payload,
        removable: true,
      });
    },
    removeChannel: (state, action) => {
      state.data.filter((channel) => channel.id !== action.payload);
    },
  }
});

export const { addInitialChannels, setCurrentChannel, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
