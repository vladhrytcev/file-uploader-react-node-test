import fs from "fs";

import { UPLOAD_DIR } from "../helpers/uploadDir";
import { NO_FILES_TO_UPLOAD, FOLDER_ALREADY_EXIST } from "../helpers/errors";
import { asyncHandler } from "../middlewares/async";
import linksDB from "../helpers/linksDB";

export const getFiles = asyncHandler(async (req, res, next) => {
  const directories = fs.readdirSync(UPLOAD_DIR);
  if (!directories.length) return res.send(directories);
  const fileTree = directories.map((directory) => ({
    dirName: directory,
    files: fs.readdirSync(`${UPLOAD_DIR}/${directory}`),
  }));
  res.send(fileTree);
});

export const uploadFiles = asyncHandler(async (req, res, next) => {
  const { files } = req;

  if (!files) return next(NO_FILES_TO_UPLOAD);
  const name = Object.keys(files)[0];
  let dirName = "";
  let data = Object.values(files)[0];

  name ? (dirName = name) : (dirName = new Date().getTime().toString());
  const dirPath = `${UPLOAD_DIR}/${dirName}/`;

  if (fs.existsSync(dirPath)) return next(FOLDER_ALREADY_EXIST);
  if (!Array.isArray(data)) data = [data];

  fs.mkdirSync(dirPath);

  for await (let file of data) {
    const fileName = file.name;
    await file.mv(dirPath + fileName);
  }

  linksDB[req.protocol + '://' + req.headers.host + '/api' + `/download/${dirName}`] = []

  res.status(200).send(`/download/${dirName}`);
});
