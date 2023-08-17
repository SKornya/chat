import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.setAll,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  addChannel, setChannels, renameChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
