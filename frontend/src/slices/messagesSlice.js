import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {
  data: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addInitialMessages: (state, action) => {
      action.payload.forEach((mes) => {
        state.data.push(mes);
      });
    },
    addMessage: (state, action) => {
      state.data.push(action.payload);
      // {
      //   id: _.uniqueId(),
      //   channelId: action.payload.channelId,
      //   content: action.payload.content,
      // }
    },
  }
});

export const { addInitialMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
