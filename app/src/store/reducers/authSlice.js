import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'utils/firebase';
import { setAuthHeader, resetAuthHeader } from 'utils/http';
import { userSessionKey } from 'config';

import { fetch as apiFetchUser } from 'api/users';

// Helpers
const getInitialUser = () =>
  window.localStorage.getItem(userSessionKey)
    ? JSON.parse(window.localStorage.getItem(userSessionKey))
    : null;

export const setUser = (user) => {
  window.localStorage.setItem(userSessionKey, JSON.stringify(user));
};

export const unsetUser = () => window.localStorage.removeItem(userSessionKey);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    error: null,
    processing: null,
  },
  reducers: {
    requestInProgress(state) {
      state.processing = true;
    },
    loginSuccess(state, { payload }) {
      state.user = payload;
      state.processing = false;
      state.error = null;
      setUser(payload);
    },
    loginFailed(state, { payload }) {
      state.processing = false;
      state.error = payload;
      state.user = null;
      unsetUser();
      resetAuthHeader();
    },
    loggedOut(state) {
      state.processing = null;
      state.error = null;
      state.user = null;
      unsetUser();
      resetAuthHeader();
    },
  },
});

export const {
  requestInProgress,
  loginSuccess,
  loginFailed,
  loggedOut,
} = authSlice.actions;

export const login = ({ email, password }, cb = () => {}) => async (
  dispatch
) => {
  dispatch(requestInProgress());

  try {
    const { additionalUserInfo, user } = await signInWithEmailAndPassword(
      email,
      password
    );
    const { isNewUser } = additionalUserInfo;
    // TODO Ideally should pick only fields required.
    const parsedUser = JSON.parse(JSON.stringify(user));
    const { uid, stsTokenManager } = parsedUser;
    const { accessToken } = stsTokenManager;

    setAuthHeader(accessToken);
    const fetchedUserResponse = await apiFetchUser(uid);
    const { message: fetchedUser } = fetchedUserResponse;

    const userToSet = { ...fetchedUser, accessToken };
    dispatch(loginSuccess(userToSet));
    cb(null, userToSet);
  } catch (err) {
    dispatch(loginFailed(err));
    cb(err, null);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch(loggedOut());
};

export default authSlice.reducer;
