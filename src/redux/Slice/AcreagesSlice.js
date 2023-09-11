import { createSlice } from '@reduxjs/toolkit';

const acreageSlice = createSlice({
  name: 'acreage',
  initialState: {
    acreages: [],
    message: '',
  },
  reducers: {
    getAcreagesSuccess(state, action) {
      state.acreages = action.payload.response;
      state.message = action.payload.message;
    },
    getAcreagesFail(state, action) {
      state.acreages = [];
      state.message = action.payload.message;
    },
  },
});

export const { getAcreagesSuccess, getAcreagesFail } = acreageSlice.actions;
export default acreageSlice.reducer;
