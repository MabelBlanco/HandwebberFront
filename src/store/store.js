import { configureStore } from '@reduxjs/toolkit';
import adsListReducer from './adsListSlice';
import uiReducer from './uiSlice';
import paginationReducer from './paginationSlice';
import authSliceReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    adsList: adsListReducer,
    ui: uiReducer,
    pagination: paginationReducer,
  },
});
