import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    message: '',
    count: 0,
    newPosts: [],
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
    getNewPostsSuccess(state, action) {
      state.newPosts = action.payload;
    },
    getNewPostsFail(state, action) {
      state.newPosts = [];
      state.message = action.payload;
    },
  },
});

export const { getPostsSuccess, getPostsFail, getNewPostsSuccess, getNewPostsFail } = postSlice.actions;
export default postSlice.reducer;
