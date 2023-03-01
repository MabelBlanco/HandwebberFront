import { configureStore } from '@reduxjs/toolkit';
import adsListReducer from './adsListSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: { adsList: adsListReducer, ui: uiReducer },
});
