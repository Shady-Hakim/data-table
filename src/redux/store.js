import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './data/tableSlice';

export const store = configureStore({
  reducer: {
    data: tableReducer,
  },
});
