import { takeLatest, put } from "redux-saga/effects";
import { safe } from "./errorHandler";
import { getFileTree, downloadFolder, downloadFile } from "../../services/api";
import {
  GET_DOWNLOAD_LINK,
  SET_DOWNLOAD_LINK,
  DOWNLOAD_FOLDER,
  DOWNLOAD_FILE,
} from "../actions/types";
import { downloadAction } from "../../utils/downloadAction";

const getDownloadLink = function* ({ payload }) {
  const link = yield getFileTree(payload);
  yield put({ type: SET_DOWNLOAD_LINK, payload: link });
};

const downloadUserFile = function* ({ payload }) {
  const downloadUrl = yield downloadFile({ ...payload });
  downloadAction(downloadUrl, downloadUrl.split('/').pop());
};

const downloadUserFolder = function* ({ payload }) {
  const downloadUrl = yield downloadFolder({ ...payload });
  downloadAction(downloadUrl, downloadUrl.split('/').pop());
};

const downloadSagas = [
  takeLatest(GET_DOWNLOAD_LINK, safe(getDownloadLink)),
  takeLatest(DOWNLOAD_FOLDER, safe(downloadUserFolder)),
  takeLatest(DOWNLOAD_FILE, safe(downloadUserFile)),
];

export default downloadSagas;
