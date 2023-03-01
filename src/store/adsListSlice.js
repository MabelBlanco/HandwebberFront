import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const initialState = {
  areLoaded: false,
  result: [],
  meta: {},
};

export const adsListSlice = createSlice({
  name: 'adsList',
  initialState,
  reducers: {
    adsLoadSuccess: (state, action) => {
      state.areLoaded = true;
      state.result = action.payload.result;
      state.meta = action.payload.meta;
    },
  },
});

export const { adsLoadSuccess } = adsListSlice.actions;

export const useAdsListSelector = () =>
  useSelector((state) => state.adsList.result);

export const useMetaSelector = () => useSelector((state) => state.adsList.meta);

export const useAdsAreLoadedSelector = () =>
  useSelector((state) => state.adsList.areLoaded);

export const useDispatchAdsList = () => useDispatch();

export default adsListSlice.reducer;
