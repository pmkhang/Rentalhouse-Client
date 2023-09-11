// postSlice.js

import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    message: '',
  },
  reducers: {
    getCategorySuccess(state, action) {
      state.categories = action.payload.response;
      state.message = action.payload.message;
    },
    getCategoryFail(state, action) {
      state.categories = [];
      state.message = action.payload.message;
    },
  },
});

export const { getCategorySuccess, getCategoryFail } = categorySlice.actions;
export default categorySlice.reducer;
