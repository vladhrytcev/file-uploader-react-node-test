import { all } from "redux-saga/effects";
import linksSagas from "./links";
import upload from "./upload";
import download from "./download";

function* rootSaga() {
  return yield all([...linksSagas, ...upload, ...download]);
}

export default rootSaga;