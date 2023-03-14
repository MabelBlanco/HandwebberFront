import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "..";
import { removeAuthorizationHeader } from "../api/client";
import { getUserAdvertisements } from "../components/advertisements/service";
import { getUserById } from "../components/auth/service";
import decodeToken from "../utils/decodeToken";
import storage from "../utils/storage";

const initialState = { isLogged: false, user: {} };

export const authSlice = createSlice({
  name: "auth",
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

export const { authSuccess, authError, authLogout } = authSlice.actions;

export const useIsLoggedSelector = () => useSelector((state) => state.auth);

export function fetchLoggedAction() {
  return async function (dispatch) {
    const { userId } = decodeToken(storage.get("auth")) || {};
    if (!userId) return;
    try {
      const user = await getUserById(userId);
      const ads = await getUserAdvertisements(userId);
      const data = {
        _id: user.result._id,
        username: user.result.username,
        image: user.result.image,
        subscriptions: user.result.subscriptions,
        ads: ads.result,
      };
      //dispatch(authSlice.actions.authSuccess(data));
      dispatch(authSuccess(data));
      // The user connect with socket.io
      socket.emit("join", userId);
    } catch (error) {
      dispatch(authError());
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
    storage.remove("auth");
    dispatch(authSlice.actions.authLogout());
    socket.disconnect();
  };
}

export default authSlice.reducer;
