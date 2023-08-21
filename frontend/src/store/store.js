import { configureStore } from '@reduxjs/toolkit';
import channels from '../slices/channelsSlice';
import messages from '../slices/messagesSlice';
import channel from '../slices/channelSlice';

const store = configureStore({
  reducer: {
    channel,
    channels,
    messages,
  },
});

export default store;
