import { configureStore } from '@reduxjs/toolkit';
import adsListReducer from './adsListSlice';
import uiReducer from './uiSlice';
import paginationReducer from './paginationSlice';

export const store = configureStore({
  reducer: {
    adsList: adsListReducer,
    ui: uiReducer,
    pagination: paginationReducer,
  },
});
