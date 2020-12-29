import fs from "fs";

import { UPLOAD_DIR } from "../helpers/uploadDir";
import { NO_FILES_TO_UPLOAD, FOLDER_ALREADY_EXIST } from "../helpers/errors";
import { asyncHandler } from "../middlewares/async";
import { Link } from "../models/Link";

const makeDir = (path) => {
  if (fs.existsSync(path)) return false
  fs.mkdirSync(path);
  return true
}

export const uploadFiles = asyncHandler(async (req, res, next) => {

  const { files } = req;
  const { id } = req.params
  const { lang } = req.headers

  if (!files) return next(NO_FILES_TO_UPLOAD);
  let dirNames = Object.keys(files);
  const dirPath = `${UPLOAD_DIR}/${id}/`;
  if (!makeDir(dirPath)) return next(FOLDER_ALREADY_EXIST);
  const fileTree = {}

  for await (let dirName of dirNames) {
    let dir
    if (!Array.isArray(files[dirName])) dir = [files[dirName]];
    else dir = files[dirName]
    if (!makeDir(dirPath + dirName)) return next(FOLDER_ALREADY_EXIST);
    fileTree[dirName] = []

    for await (let file of dir) {
      const fileName = file.name;
      fileTree[dirName].push(file.name)
      await file.mv(dirPath + dirName + "/" + fileName);
    }
  }
  const address = req.headers.referer + "client/" + id

  const link = new Link({link: id, language: lang, originalDir: dirPath, fileTree, address})
  await link.save()

  res.status(200).send(link);
});
