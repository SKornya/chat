import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from '../slices/channelsSlice';
import messagesSlice from '../slices/messagesSlice';
import channelSlice from '../slices/channelSlice';

const store = configureStore({
  reducer: {
    channel: channelSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;
