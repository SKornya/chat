import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const id = action.payload;
        if (id === state.currentChannelId) {
          state.currentChannelId = null;
        }
      });
    // .addCase(addChannel, (state, action) => {
    //   const id = action.payload.id;
    //   state.currentChannelId = id;
    // });
  },
});

export const { setDefaultChannelId, setCurrentChannelId } = channelSlice.actions;
export default channelSlice.reducer;
