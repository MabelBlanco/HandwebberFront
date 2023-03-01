import { configureStore } from '@reduxjs/toolkit';
import adsListReducer from './adsListSlice';

export const store = configureStore({ reducer: { adsList: adsListReducer } });
