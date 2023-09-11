

import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    message: '',
    count: 0,
  },
  reducers: {
    getPostsSuccess(state, action) {
      state.posts = action.payload.rows;
      state.message = action.payload.message;
      state.count = action.payload.count;
    },
    getPostsFail(state, action) {
      state.posts = [];
      state.message = action.payload;
      state.count = 0;
    },
  },
});

export const { getPostsSuccess, getPostsFail } = postSlice.actions;
export default postSlice.reducer;
