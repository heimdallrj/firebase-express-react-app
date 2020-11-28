import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    processing: null,
  },
  reducers: {
    loginInProgress(state) {
      state.processing = true;
    },
    loginSuccess(state, { payload }) {
      state.user = payload;
      state.processing = false;
      state.user = payload; // Set this in sessionStorage
    },
    loginFailed(state, { payload }) {
      state.processing = false;
      state.error = payload;
      state.user = null; // Reset session storage
    },
    loggedOut(state) {
      state.processing = null;
      state.error = null;
      state.user = null; // Reset session storage
    },
  },
});

export const {
  loginInProgress,
  loginSuccess,
  loginFailed,
  loggedOut,
} = authSlice.actions;

export const login = (user, cb = () => {}) => async (dispatch) => {
  dispatch(loginInProgress());
};

export const logOut = () => async (dispatch) => {
  dispatch(loggedOut());
};

export default authSlice.reducer;
