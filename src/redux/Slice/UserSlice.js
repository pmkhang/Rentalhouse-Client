import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersData: [],
  },
  reducers: {
    getUsersDataSuccess: (state, action) => {
      state.usersData = action.payload.response;
    },
    getUsersDataFail: (state, action) => {
      state.usersData = {};
    },
  },
});

export const { getUsersDataSuccess, getUsersDataFail } = userSlice.actions;

export default userSlice.reducer;
