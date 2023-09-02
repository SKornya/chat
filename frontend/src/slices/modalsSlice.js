/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {
    type: null,
    data: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.info.type = null;
      state.info.data = null;
    },
    showModal: (state, { payload }) => {
      state.info.type = payload.type;
      state.info.data = payload.data || null;
    },
  },
});

export const { hideModal, showModal } = modalsSlice.actions;
export default modalsSlice.reducer;
