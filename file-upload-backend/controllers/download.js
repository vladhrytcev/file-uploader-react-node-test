import path from "path";
import zip from "express-zip";
import fs from "fs";

import { UPLOAD_DIR } from "../helpers/uploadDir";
import { FILE_NOT_FOUND } from "../helpers/errors";
import { asyncHandler } from "../middlewares/async";
import { linkBuilder } from "../helpers/linkNameBuilder";
import linksDB from "../helpers/linksDB";

export const downloadFile = asyncHandler(async (req, res, next) => {
  const { folder, filename } = req.params;
  if (!folder && !filename) return next(FILE_NOT_FOUND);
  const filePath = path.resolve(`${UPLOAD_DIR}/${folder}/${filename}`);

  if(!fs.existsSync(filePath)) return next(FILE_NOT_FOUND)

  const link = linkBuilder(req, folder)
  linksDB[link] ? linksDB[link] = [...linksDB[link], req.ip] : linksDB[link] = []
  res.download(filePath);
});

export const downloadFolder = asyncHandler(async (req, res, next) => {
  const { folder } = req.params;
  if (!folder) return next(FILE_NOT_FOUND);
  const folderPath = path.resolve(`${UPLOAD_DIR}/${folder}`);

  if(!fs.existsSync(folderPath)) return next(FILE_NOT_FOUND)

  const files = fs.readdirSync(folderPath);
  const archive = files.map((file) => ({
    path: `${folderPath}/${file}`,
    name: file,
  }));
  const link = linkBuilder(req, folder)
  linksDB[link] ? linksDB[link] = [...linksDB[link], req.ip] : linksDB[link] = []
  res.zip(archive);
});
