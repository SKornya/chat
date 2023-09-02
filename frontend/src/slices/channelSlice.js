/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  currentChannelId: 1,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const id = action.payload;
        if (id === state.currentChannelId) {
          state.currentChannelId = 1;
        }
      });
  },
});

export const { setCurrentChannelId } = channelSlice.actions;
export default channelSlice.reducer;
