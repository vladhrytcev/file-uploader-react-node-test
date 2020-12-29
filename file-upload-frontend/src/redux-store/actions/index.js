import {
  GET_LINKS,
  UPLOAD_FILES,
  SET_LAST_CREATED_LINK,
  DELETE_LINK,
  GET_DOWNLOAD_LINK,
  DOWNLOAD_FILE,
  DOWNLOAD_FOLDER,
} from "./types";

export const getLinks = () => ({
  type: GET_LINKS,
});

export const deleteLink = (id) => ({
  type: DELETE_LINK,
  payload: id,
});

export const getDownloadLink = (id) => ({
  type: GET_DOWNLOAD_LINK,
  payload: id,
});

export const uploadFiles = (data) => ({
  type: UPLOAD_FILES,
  payload: data,
});

export const resetLastCreateLink = () => ({
  type: SET_LAST_CREATED_LINK,
  payload: null,
});

export const downloadFile = (path) => ({
  type: DOWNLOAD_FILE,
  payload: path
});

export const downloadFolder = (path) => ({
  type: DOWNLOAD_FOLDER,
  payload: path
});
