// store.js

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from '../Slice/AuthSlice';
import CategorySlice from '../Slice/CategorySlice';
import PostsSlice from '../Slice/PostsSlice';
import UserSlice from '../Slice/UserSlice';
import { persistConfig } from './persistConfig';
import PricesSlice from '../Slice/PricesSlice';
import AcreagesSlice from '../Slice/AcreagesSlice';
import ProvinceSlice from '../Slice/ProvinceSlice';

const persistedAuthReducer = persistReducer(persistConfig, AuthSlice);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: PostsSlice,
    category: CategorySlice,
    user: UserSlice,
    price: PricesSlice,
    acreage: AcreagesSlice,
    province: ProvinceSlice,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

export const persistor = persistStore(store);

export default store;
