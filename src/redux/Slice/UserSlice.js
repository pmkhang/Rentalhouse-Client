import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersData: [],
    userDataByID: [],
  },
  reducers: {
    getUsersDataSuccess: (state, action) => {
      state.usersData = action.payload.response;
      state.userDataByID = action.payload.response;
    },
    getUsersDataFail: (state, action) => {
      state.usersData = [];
      state.userDataByID = [];
    },
  },
});

export const { getUsersDataSuccess, getUsersDataFail } = userSlice.actions;

export default userSlice.reducer;
