import { takeLatest, put } from "redux-saga/effects";
import { safe } from "./errorHandler";
import { getFileTree, downloadFolder, downloadFile } from "../../services/api";
import {
  GET_DOWNLOAD_LINK,
  SET_DOWNLOAD_LINK,
  DOWNLOAD_FOLDER,
  DOWNLOAD_FILE, DOWNLOAD_OR_OPEN_FILE,
} from "../actions/types";
import { downloadAction, isPDF, openPdfFile } from "../../utils/downloadAction";

const getDownloadLink = function* ({ payload }) {
  const link = yield getFileTree(payload);
  yield put({ type: SET_DOWNLOAD_LINK, payload: link.data });
};

const downloadUserFile = function* ({ payload }) {
  const blob = yield downloadFile({ ...payload });
  downloadAction(blob, payload.fileName);
};

const downloadOrOpenUserFile = function* ({ payload }) {
  const blob = yield downloadFile({ ...payload });
  if(isPDF(blob.name)) {
    const newBlob = new Blob([blob], {type: "application/pdf"})
    openPdfFile(newBlob)
  }
  else downloadAction(blob, payload.fileName);
};

const downloadUserFolder = function* ({ payload }) {
  const blob = yield downloadFolder({ ...payload });
  downloadAction(blob, `${payload.parent}.zip`);
};

const downloadSagas = [
  takeLatest(GET_DOWNLOAD_LINK, safe(getDownloadLink)),
  takeLatest(DOWNLOAD_FOLDER, safe(downloadUserFolder)),
  takeLatest(DOWNLOAD_FILE, safe(downloadUserFile)),
  takeLatest(DOWNLOAD_OR_OPEN_FILE, safe(downloadOrOpenUserFile)),
];

export default downloadSagas;
