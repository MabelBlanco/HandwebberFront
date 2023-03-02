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
    loadThisAd: (state, action) => {
      if (!state.result.includes(action.payload.result)) {
        state.result = [...state.result, action.payload.result];
      }
    },
  },
});

export const { adsLoadSuccess, loadThisAd } = adsListSlice.actions;

export const useAdsListSelector = () =>
  useSelector((state) => state.adsList.result);

export const useMetaSelector = () => useSelector((state) => state.adsList.meta);
export const useNumberOfAdsSelector = () =>
  useSelector((state) => state.adsList.meta.totalNumOfAds);

export const useAdsAreLoadedSelector = () =>
  useSelector((state) => state.adsList.areLoaded);

export const useDispatchAdsList = () => useDispatch();

export default adsListSlice.reducer;
