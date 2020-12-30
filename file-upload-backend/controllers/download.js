import path from "path";
import zip from "express-zip";
import fs from "fs";

import { Link } from "../models/Link";
import { UPLOAD_DIR } from "../helpers/uploadDir";
import { FILE_NOT_FOUND } from "../helpers/errors";
import { asyncHandler } from "../middlewares/async";


export const getFiles = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const visitor = req.ip.replace("::ffff:", "")
  const link = await Link.findOne({link: id})
  const visited = link.visited
  if(!visited.find(ip => ip === visitor)) {
    link.visited.push(visitor)
    link.save()
  }
  res.send(link)
});

export const downloadFile = asyncHandler(async (req, res, next) => {
  const { linkId, folder, filename } = req.params;
  if (!folder && !filename) return next(FILE_NOT_FOUND);
  const filePath = path.resolve(`${UPLOAD_DIR}/${linkId}/${folder}/${filename}`);

  if(!fs.existsSync(filePath)) return next(FILE_NOT_FOUND)
  res.download(filePath);
});

export const downloadFolder = asyncHandler(async (req, res, next) => {
  const { linkId, folder } = req.params;
  if (!folder) return next(FILE_NOT_FOUND);
  const folderPath = path.resolve(`${UPLOAD_DIR}/${linkId}/${folder}`);

  if(!fs.existsSync(folderPath)) return next(FILE_NOT_FOUND)

  const files = fs.readdirSync(folderPath);
  const archive = files.map((file) => ({
    path: `${folderPath}/${file}`,
    name: file,
  }));
  res.zip(archive);
});
