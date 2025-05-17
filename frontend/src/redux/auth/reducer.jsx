import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userData: {},
  loggedIn: true,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser(state) {
      state.loading = true;
      state.error = null;
    },

    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload.data;
      state.loggedIn = true;
    },
    loginFailure(state, action) {
      state.loading = false;
    },

    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload.data;
      state.loggedIn = true;
    },
    registerFailure(state, action) {
      state.loading = false;
    },

    getUserDataSuccess(state, action) {
      state.loading = false;
      state.userData = action?.payload?.data;
      state.loggedIn = true;
    },
    getUserDataFailure(state, action) {
      state.loading = false;
    },

    logout(state) {
      state.userData = {};
      state.loggedIn = false;
      state.loading = false;
    },
  },
});

export const {
  getUser,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  getUserDataSuccess,
  getUserDataFailure,
  logout,
} = AuthReducer.actions;

export default AuthReducer.reducer;
