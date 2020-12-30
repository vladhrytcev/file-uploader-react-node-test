import { takeLatest, put, select } from "redux-saga/effects";
import { safe } from "./errorHandler";
import { uploadFiles } from "../../services/api";
import { UPLOAD_FILES, SET_LINKS, SET_LAST_CREATED_LINK } from "../actions/types";

const makeName = (packageName) => {
  return packageName || Math.round(Date.now() + (Math.random() * 1000)).toString()
}

const uploadAllFiles = function* ({ payload }) {
  const data = new FormData();
  for(let fileStack of payload.fileStacks) {
    if(!fileStack.files.length) return
    const name = makeName(fileStack.packageName)
    for(let file of fileStack.files) {
      yield data.append(name, file.data)
    }
  }
  const link = yield uploadFiles({files: data, id: payload.id, lang: payload.language});
  const links = yield select((state) => state.links.links)
  yield put({type: SET_LINKS, payload: [link.data, ...links]});
  yield put({type: SET_LAST_CREATED_LINK, payload: link.data});
};

const uploadSagas = [takeLatest(UPLOAD_FILES, safe(uploadAllFiles))];

export default uploadSagas