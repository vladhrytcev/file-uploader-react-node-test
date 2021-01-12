import { put, fork } from "redux-saga/effects";
import { SET_ERROR, SET_LOADING } from "../actions/types";

const safeWrapper = function* (saga, ...args) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    yield saga(args[0]);
  } catch (err) {
    yield put({ type: SET_ERROR, payload: err });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
};

export const safe = (saga) =>
  function* (prop) {
    yield fork(safeWrapper, saga, prop);
  };