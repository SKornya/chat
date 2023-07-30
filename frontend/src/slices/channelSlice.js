import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultChannelId: null,
  currentChannelId: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setDefaultChannelId: (state, action) => {
      state.defaultChannelId = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setDefaultChannelId, setCurrentChannelId } = channelSlice.actions;
export default channelSlice.reducer;
