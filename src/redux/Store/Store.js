// store.js

import { configureStore } from '@reduxjs/toolkit';
import PostsSlice from '../Slice/PostsSlice';
import AuthSlice from '../Slice/AuthSlice';

const store = configureStore({
  reducer: {
    post: PostsSlice,
    auth: AuthSlice,
  },
});

export default store;
