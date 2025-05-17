// Dependencies
import { all, put, takeLatest, call } from "redux-saga/effects";
import { getRequest, postRequest } from "../../helper/axiosClient";
import { message } from "antd";

import {
  getUserDataSuccess,
  getUserDataFailure,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from "./reducer";

export function* getUser() {
  try {
    const response = yield call(() => getRequest({ url: "/users" }));
    yield put(getUserDataSuccess(response?.data));
    message.success("User data fetched successfully");
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(getUserDataFailure(err.message));
  }
}

export function* loginUser(action) {
  try {
    const response = yield call(() =>
      postRequest({ url: "/auth/login", data: action.payload })
    );
    yield put(loginSuccess(response?.data));
    message.success("Login successful");
  } catch (err) {
    message.error("Login failed");
    yield put(loginFailure(err.response?.data?.message || "Login failed"));
  }
}

export function* registerUser(action) {
  try {
    const response = yield call(() =>
      postRequest({ url: "/auth/register", data: action.payload })
    );
    yield put(registerSuccess(response?.data));
    message.success("Registration successful");
  } catch (err) {
    message.error("Registration failed");
    yield put(registerFailure(err.response?.data?.message || "Registration failed"));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest("auth/getUser", getUser),
    takeLatest("auth/loginRequest", loginUser),
    takeLatest("auth/registerRequest", registerUser),
  ]);
}
