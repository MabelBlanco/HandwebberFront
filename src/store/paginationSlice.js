import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
export const MAX_RESULTS_PER_PAGE = 1;

const initialState = {
  page: 1,
};

const numPages = (totalNumOfAds) => {
  return Math.ceil(totalNumOfAds / MAX_RESULTS_PER_PAGE);
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    first: (state) => {
      state.page = 1;
    },
    last: (state, action) => {
      const lastPage = numPages(action.payload);
      state.page = lastPage;
    },
    next: (state, action) => {
      const lastPage = numPages(action.payload);
      if (state.page < lastPage) {
        state.page++;
      }
    },
    previous: (state) => {
      if (state.page > 1) {
        state.page--;
      }
    },
  },
});

export const { first, last, next, previous } = paginationSlice.actions;

export const useDispatchPagination = () => useDispatch();

export const useFirstPage = () => useDispatch();
export const useLastPage = () => useDispatch();
export const usePrevious = () => useDispatch();
export const useNext = () => useDispatch();

export const useActualPage = () =>
  useSelector((state) => state.pagination.page);

export default paginationSlice.reducer;
