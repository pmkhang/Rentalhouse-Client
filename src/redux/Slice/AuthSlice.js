// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    message: '',
    update: false,
    error: 2,
  },
  reducers: {
    registerSuccess(state, action) {
      state.isLoggedIn = false;
      state.token = action.payload.data;
      state.message = '';
      state.update = true;
      state.error = action.payload.error;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.data;
      state.message = '';
      state.error = action.payload.error;
    },
    registerFail(state, action) {
      state.isLoggedIn = false;
      state.message = action.payload.data;
      state.token = null;
      state.update = !state.update;
      state.error = action.payload.error;
    },
    loginFail(state, action) {
      state.isLoggedIn = false;
      state.message = action.payload.data;
      state.token = null;
      state.error = action.payload.error;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.message = '';
    },
  },
});

export const { registerSuccess, loginSuccess, registerFail, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
