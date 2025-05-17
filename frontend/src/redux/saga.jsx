import { all } from "redux-saga/effects";
import Auth from "./auth/saga";
import MovieSaga from "./movie/saga";

const saga = [
  MovieSaga(),
  Auth(),
  // We can add upcoming saga here..
];
export default function* rootSaga(getState) {
  yield all([...saga]);
}
