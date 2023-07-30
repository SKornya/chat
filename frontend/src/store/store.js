import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from '../slices/channelsSlice';
import messagesSlice from '../slices/messagesSlice';

export const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
  },
});
