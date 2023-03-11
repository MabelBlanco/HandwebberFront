import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAdvertisementDetail,
  getAdvertisements,
} from '../components/advertisements/service';
import { errorUi, request, success } from './uiSlice';

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
    loadThisAd: (state, action) => {
      //TODO
      //console.log('payload:', action.payload);
      if (!state.data.includes(action.payload.result._id)) {
        state.data = [...state.data, action.payload.result];
      }
    },
    updateThisAd: (state, action) => {
      state.data[action.payload.adIndex] = action.payload.updatedAd;
    },
  },
});

//Actions
export const { adsLoadSuccess, loadThisAd, updateThisAd } =
  adsListSlice.actions;

function fetchAdsAction(skip, limit, filters) {
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
  if (!adFinded) {
    //TODO buscar el anuncio en la base de datos y cargarlo
    console.log('El anuncio no está ahora mismo en el estado');
  }
  return adFinded;
};

export const getAdIndexById = (adId) => (state) => {
  const idsEquals = (element) => {
    return element._id.toString() === adId;
  };
  const index = state.adsList.data?.findIndex(idsEquals);
  return index;
};

export const useDispatchAdsList = () => useDispatch();

export default adsListSlice.reducer;
