// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import PostsSlice from '../Slice/PostsSlice';
import AuthSlice from '../Slice/AuthSlice';
import { persistConfig } from './persistConfig';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import CategorySlice from '../Slice/CategorySlice';

const persistedAuthReducer = persistReducer(persistConfig, AuthSlice);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: PostsSlice,
    category: CategorySlice,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

export const persistor = persistStore(store);

export default store;
