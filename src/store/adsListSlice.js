import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdvertisements } from '../components/advertisements/service';
import { errorUi, request, success } from './uiSlice';

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

//Actions
export const { adsLoadSuccess, loadThisAd } = adsListSlice.actions;

export function fetchAdsAction(skip, limit, filters) {
  return async function (dispatch) {
    try {
      dispatch(request());
      const ads = await getAdvertisements(skip, limit, filters);
      dispatch(adsLoadSuccess(ads));
      dispatch(success());
    } catch (error) {
      dispatch(errorUi(error));
    }
  };
}
export function useDispatchFetchAdsAction(skip, limit, filters) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdsAction(skip, limit, filters));
  }, [dispatch, skip, limit, filters]);
}

//Selectors
export const useAdsListSelector = () =>
  useSelector((state) => state.adsList.result);
export const useMetaSelector = () => useSelector((state) => state.adsList.meta);
export const useNumberOfAdsSelector = () =>
  useSelector((state) => state.adsList.meta.totalNumOfAds);
export const useAdsAreLoadedSelector = () =>
  useSelector((state) => state.adsList.areLoaded);

export const useDispatchAdsList = () => useDispatch();

export default adsListSlice.reducer;
