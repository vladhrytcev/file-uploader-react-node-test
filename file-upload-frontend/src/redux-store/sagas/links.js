import { takeLatest, put, select } from "redux-saga/effects";
import { safe } from "./errorHandler";
import { getLinks, deleteLink } from "../../services/api";
import { GET_LINKS, SET_LINKS, DELETE_LINK } from "../actions/types";

const getAllLinks = function* () {
  const links = yield getLinks();
  yield put({type: SET_LINKS, payload: links.data});
};

const deleteFilesLink = function* ({ payload }) {
  yield deleteLink(payload);
  const links = yield select((state) => state.links.links)
  yield put({type: SET_LINKS, payload: links.filter(link => link.link !== payload)});
};

const linksSagas = [
  takeLatest(GET_LINKS, safe(getAllLinks)),
  takeLatest(DELETE_LINK, safe(deleteFilesLink)),
];

export default linksSagas
