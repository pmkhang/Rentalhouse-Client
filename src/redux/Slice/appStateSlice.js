// appStateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'string',
  initialState: {
    searchTitle: '',
  },
  reducers: {
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
  },
});

export const { setSearchTitle } = appStateSlice.actions;
export default appStateSlice.reducer;
