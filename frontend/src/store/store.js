import { configureStore } from '@reduxjs/toolkit';
import channels from '../slices/channelsSlice';
import messages from '../slices/messagesSlice';
import channel from '../slices/channelSlice';
import modals from '../slices/modalsSlice';

const store = configureStore({
  reducer: {
    channel,
    channels,
    messages,
    modals,
  },
});

export default store;
