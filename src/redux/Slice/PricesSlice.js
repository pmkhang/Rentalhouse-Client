

import { createSlice } from '@reduxjs/toolkit';

const priceSlice = createSlice({
  name: 'price',
  initialState: {
    prices: [],
    message: '',
  },
  reducers: {
    getPricesSuccess(state, action) {
      state.prices = action.payload.response;
      state.message = action.payload.message;
    },
    getPricesFail(state, action) {
      state.prices = [];
      state.message = action.payload.message;
    },
  },
});

export const { getPricesSuccess, getPricesFail } = priceSlice.actions;
export default priceSlice.reducer;
