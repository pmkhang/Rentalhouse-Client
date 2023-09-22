import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    message: '',
    count: 0,
    newPosts: [],
    userPosts: [],
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
    getUserPostSucces(state, action) {
      state.userPosts = action.payload.rows;
      state.message = action.payload.message;
      state.count = action.payload.count;
    },
    getUserPostFail(state, action) {
      state.userPosts = [];
      state.message = action.payload;
      state.count = 0;
    },
  },
});

export const {
  getPostsSuccess,
  getPostsFail,
  getNewPostsSuccess,
  getNewPostsFail,
  getUserPostSucces,
  getUserPostFail,
} = postSlice.actions;
export default postSlice.reducer;
