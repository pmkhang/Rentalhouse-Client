import { createSlice } from '@reduxjs/toolkit';

const AddressProvinceSlice = createSlice({
  name: 'price',
  initialState: {
    provincesData: [],
    districtsData: [],
    wardsData: [],
  },
  reducers: {
    getProvincesDataSuccess(state, action) {
      state.provincesData = action.payload;
    },
    getDistrictsDataSuccess(state, action) {
      state.districtsData = action.payload;
    },
    getWardsDataSuccess(state, action) {
      state.wardsData = action.payload;
    },
    getProvinceFail(state) {
      state.provincesData = [];
    },
  },
});

export const { getProvinceSuccess, getProvinceFail } = AddressProvinceSlice.actions;
export default AddressProvinceSlice.reducer;
