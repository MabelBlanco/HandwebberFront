import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAdvertisementDetail,
  getAdvertisements,
} from '../components/advertisements/service';
import { errorUi, setUiIsFetching, setUiSuccess } from './uiSlice';

const initialState = {
  areLoaded: false,
  data: [],
  meta: {},
};

export const adsListSlice = createSlice({
  name: 'adsList',
  initialState,
  reducers: {
    adsLoadSuccess: (state, action) => {
      state.areLoaded = true;
      state.data = action.payload.result;
      state.meta = action.payload.meta;
    },
    loadOneAd: (state, action) => {
      state.data = state.data.concat([action.payload]);
      //state.data.push(action.payload);
    },
    updateThisAd: (state, action) => {
      state.data[action.payload.adIndex] = action.payload.updatedAd;
    },
  },
});

//Selectors
export const useAdsListSelector = () =>
  useSelector((state) => state.adsList.data);

export const useMetaSelector = () => useSelector((state) => state.adsList.meta);

export const useNumberOfAdsSelector = () =>
  useSelector((state) => state.adsList.meta.totalNumOfAds);

export const useAdsAreLoadedSelector = () =>
  useSelector((state) => state.adsList.areLoaded);

export const getAdById = (adId) => (state) => {
  let adFinded = state.adsList.data?.find(
    (ad) => ad._id.toString() === adId || undefined
  );

  return adFinded;
};

export const getAdIndexById = (adId) => (state) => {
  const idsEquals = (element) => {
    return element._id.toString() === adId;
  };
  const index = state.adsList.data?.findIndex(idsEquals);
  return index;
};

//Actions
export const { adsLoadSuccess, loadOneAd, updateThisAd } = adsListSlice.actions;

function fetchAdsAction(skip, limit, filters) {
  return async function (dispatch) {
    try {
      dispatch(setUiIsFetching());
      const ads = await getAdvertisements(skip, limit, filters);
      dispatch(adsLoadSuccess(ads));
      dispatch(setUiSuccess());
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

export function editAdAction(updatedAd) {
  return function (dispatch, getState) {
    const adIndex = getAdIndexById(updatedAd._id)(getState());

    const payload = {
      adIndex,
      updatedAd,
    };

    dispatch(updateThisAd(payload));
  };
}

export function loadOneAdByIdAction(adId) {
  return async function (dispatch, getState) {
    const areLoaded = getAdById(adId)(getState());

    if (areLoaded) {
      //TODO
      //console.log('el anuncio ya está cargado');
      return;
    }

    try {
      setUiIsFetching();
      const advertisement = await getAdvertisementDetail(adId);
      dispatch(loadOneAd(advertisement.result));
      setUiSuccess();
    } catch (error) {
      dispatch(errorUi(error.message));
    }
  };
}

export const useDispatchAdsList = () => useDispatch();

export default adsListSlice.reducer;
