export const UNKNOWN_ERROR = "UNKNOWN_ERROR";
export const NO_FILES_TO_UPLOAD = "NO_FILES_TO_UPLOAD";
export const FILE_NOT_FOUND = "FILE_NOT_FOUND";
export const FOLDER_ALREADY_EXIST = "FOLDER_ALREADY_EXIST";
export const LINK_NOT_EXIST = "LINK_NOT_EXIST";

export default {
  LINK_NOT_EXIST: { message: "This link doesn't exist", status: 404 },
  NO_FILES_TO_UPLOAD: { message: "No files to upload", status: 400 },
  FOLDER_ALREADY_EXIST: { message: "Folder name already exist", status: 400 },
  FILE_NOT_FOUND: { message: "File not found", status: 404 },
  UNKNOWN_ERROR: { message: "Something went wrong", status: 500 },
};
