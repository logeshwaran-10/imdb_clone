//Dependencies
import { all, put, takeLatest, call } from "redux-saga/effects";
import { getRequest, postRequest, putRequest } from "../../helper/axiosClient";
import { message } from "antd";

//actions
import {
  getMovieListSuccess,
  getMovieListFailure,
  addMovieSuccess,
  addMovieFailure,
  addNewPersonSuccess,
  addNewPersonFailure,
  getActorsSuccess,
  getActorsFailure,
  getProducersSuccess,
  getProducersFailure,
  updateMovieSuccess,
  updateMovieFailure,
} from "./reducer";

export function* getMovieList() {
  try {
    const response = yield call(() => getRequest({ url: "/movie" }));
    message.success("Movies fetched successfully");

    yield put(getMovieListSuccess(response?.data));
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(getMovieListFailure());
  }
}
export function* getActorsList() {
  try {
    const response = yield call(() => getRequest({ url: "/actors" }));
    yield put(getActorsSuccess(response?.data));
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(getActorsFailure());
  }
}
export function* getProducerList() {
  try {
    const response = yield call(() => getRequest({ url: "/producers" }));
    yield put(getProducersSuccess(response?.data));
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(getProducersFailure());
  }
}

export function* addMovie(params) {
  try {
    let response = yield call(() =>
      postRequest({ url: "movie", data: params?.payload })
    );
    yield put(addMovieSuccess(response?.data));
    message.success(response);
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(addMovieFailure());
  }
}

export function* updateMovie(params) {
  try {
    console.log("params", params);
    let response = yield call(() =>
      putRequest({
        url: `movie/${params?.payload?._id}`,
        data: params?.payload,
      })
    );
    yield put(updateMovieSuccess(response?.data));
    message.success(response);
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(updateMovieFailure());
  }
}

export function* addNewPerson(params) {
  try {
    const { value, showAddNewModal } = params.payload;
    const response = yield call(() =>
      postRequest({
        url: `add/${showAddNewModal?.name.replace("s", "")}`,
        data: value,
      })
    );
    yield put(addNewPersonSuccess(response?.data));
    message.success(response);
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(addNewPersonFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest("movie/getMovieList", getMovieList),
    takeLatest("movie/getActors", getActorsList),
    takeLatest("movie/getProducers", getProducerList),
    takeLatest("movie/addMovie", addMovie),
    takeLatest("movie/addNewPerson", addNewPerson),
    takeLatest("movie/updateMovie", updateMovie),
  ]);
}
