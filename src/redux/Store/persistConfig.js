// persistConfig.js
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

export const persistConfig = {
  ...commonConfig,
  key: 'auth',
  whitelist: ['isLoggedIn', 'token', 'id'],
};
