import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
// import _ from 'lodash';

const messageAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = messageAdapter.getInitialState();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    setMessages: messageAdapter.setAll,

    // addInitialMessages: (state, action) => {
    //   action.payload.forEach((mes) => {
    //     state.data.push(mes);
    //   });
    // },
    // addMessage: (state, action) => {
    //   state.data.push(action.payload);
    // },
  }
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
