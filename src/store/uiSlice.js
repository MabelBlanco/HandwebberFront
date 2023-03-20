import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const initialState = {
  isFetching: false,
  error: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    request: (state) => {
      state.isFetching = true;
      state.error = [];
    },
    success: (state) => {
      state.isFetching = false;
      state.error = [];
    },
    errorUi: (state, action) => {
      if (!state.error.includes(action.payload)) {
        state.error = state.error.concat([action.payload]);
      }
      state.isFetching = false;
    },
    resetErrorUi: (state) => {
      state.error = [];
    },
  },
});

export const { request, success, errorUi, resetErrorUi } = uiSlice.actions;

export const useIsFetchingSelector = () =>
  useSelector((state) => state.ui.isFetching);

export const useUiErrorSelector = () => useSelector((state) => state.ui.error);

export const useDispatchUi = () => useDispatch();

export const setUiIsFetching = () => {
  return function (dispatch) {
    dispatch(request());
  };
};
export const setUiSuccess = () => {
  return function (dispatch) {
    dispatch(success());
  };
};

export default uiSlice.reducer;
