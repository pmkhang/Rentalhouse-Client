import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    message: '',
    update: false,
    error: 2,
    id: '',
  },
  reducers: {
    registerSuccess(state, action) {
      state.isLoggedIn = false;
      state.token = action.payload.token;
      state.message = '';
      state.update = true;
      state.error = action.payload.error;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.message = '';
      state.error = action.payload.error;
      state.id = action.payload.id;
      state.update = true;
    },
    registerFail(state, action) {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.token = null;
      state.update = false;
      state.error = action.payload.error;
    },
    loginFail(state, action) {
      state.isLoggedIn = false;
      state.message = 'saimk&sdt' || action.payload.message;
      state.token = null;
      state.error = action.payload.error;
      state.update = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.message = '';
      state.id = '';
    },
    setUpdate(state, action) {
      state.update = action.payload;
    },
  },
});

export const { registerSuccess, loginSuccess, registerFail, loginFail, logout, setUpdate } = authSlice.actions;
export default authSlice.reducer;
