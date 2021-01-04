import { takeLatest, put, select } from "redux-saga/effects";
import { safe } from "./errorHandler";
import { uploadFiles } from "../../services/api";
import { checkFolderNames } from "../../utils/helpers";
import { UPLOAD_FILES, SET_LINKS, SET_LAST_CREATED_LINK } from "../actions/types";

const uploadAllFiles = function* ({ payload }) {
  const data = new FormData();

  const checkedArray = checkFolderNames('packageName' ,payload.fileStacks)

  for(let fileStack of checkedArray) {
    if(!fileStack.files.length) return
    for(let file of fileStack.files) {
      yield data.append(fileStack.packageName, file.data)
    }
  }
  const link = yield uploadFiles({files: data, id: payload.id, lang: payload.language});
  const links = yield select((state) => state.links.links)
  yield put({type: SET_LINKS, payload: [link.data, ...links]});
  yield put({type: SET_LAST_CREATED_LINK, payload: link.data});
};

const uploadSagas = [takeLatest(UPLOAD_FILES, safe(uploadAllFiles))];

export default uploadSagas