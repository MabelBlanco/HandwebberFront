import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuthorizationHeader } from '../api/client';
import { getUserAdvertisements } from '../components/advertisements/service';
import { getUserById } from '../components/auth/service';
import decodeToken from '../utils/decodeToken';
import storage from '../utils/storage';

const initialState = { isLogged: false, user: {} };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.isLogged = true;
      state.user = { ...action.payload };
    },
    authLogout: (state) => {
      state.isLogged = false;
      state.user = {};
    },
    authError: (state) => {
      state.isLogged = false;
    },
  },
});

export const { authSuccess, authError } = authSlice.actions;

export const useIsLoggedSelector = () => useSelector((state) => state.auth);

export function fetchLoggedAction() {
  return async function (dispatch) {
    try {
      const { userId } = decodeToken(storage.get('auth')) || {};
      const user = await getUserById(userId);
      const ads = await getUserAdvertisements(userId);
      const data = {
        _id: user.result._id,
        username: user.result.username,
        image: user.result.image,
        ads: ads.result,
      };
      dispatch(authSlice.actions.authSuccess(data));
    } catch (error) {
      console.log('error', error);
      dispatch(authSlice.actions.authError());
    }
  };
}

export const useDispatchLoggedAction = () => {
  const dispatch = useDispatch();

  const { isLogged } = useIsLoggedSelector();
  useEffect(() => {
    if (isLogged) return;
    dispatch(fetchLoggedAction());
  }, [dispatch, isLogged]);
};

export function dispatchLogoutAction() {
  return function (dispatch) {
    removeAuthorizationHeader();
    storage.remove('auth');
    dispatch(authSlice.actions.authLogout());
  };
}

export default authSlice.reducer;
