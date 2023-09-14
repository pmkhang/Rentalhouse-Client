import { createSlice } from '@reduxjs/toolkit';

const provinceSlice = createSlice({
  name: 'price',
  initialState: {
    provinces: [],
  },
  reducers: {
    getProvinceSuccess(state, action) {
      state.provinces = action.payload;
    },
    getProvinceFail(state, action) {
      state.provinces = [];
    },
  },
});

export const { getProvinceSuccess, getProvinceFail } = provinceSlice.actions;
export default provinceSlice.reducer;
