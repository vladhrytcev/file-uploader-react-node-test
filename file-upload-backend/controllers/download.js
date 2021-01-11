import path from "path";
import AdmZip from "adm-zip"
import fs from "fs";

import { Link } from "../models/Link";
import { UPLOAD_DIR } from "../helpers/uploadDir";
import { FILE_NOT_FOUND, LINK_NOT_EXIST } from "../helpers/errors";
import { asyncHandler } from "../middlewares/async";

export const getFiles = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const visitor = req.ip.replace("::ffff:", "");
  const link = await Link.findOne({ link: id });
  if (!link) return next(LINK_NOT_EXIST);
  const visited = link.visited;
  if (!visited.find((ip) => ip === visitor)) {
    link.visited.push(visitor);
    link.save();
  }
  res.send(link);
});

export const downloadFile = asyncHandler(async (req, res, next) => {
  const { linkId, folder, filename } = req.params;
  const { download } = req.headers
  if (!folder && !filename) return next(FILE_NOT_FOUND);
  const pathName = `/${linkId}/${folder}/${filename}`;
  const filePath = path.resolve(`${UPLOAD_DIR}${pathName}`);
  if (!fs.existsSync(filePath)) return next(FILE_NOT_FOUND);

  res.send(pathName + `?download=${download}`);
});

export const downloadFolder = asyncHandler(async (req, res, next) => {
  const { linkId, folder } = req.params;
  if (!folder) return next(FILE_NOT_FOUND);
  const pathName = `/${linkId}/${folder}`;
  const folderPath = path.resolve(`${UPLOAD_DIR}/${pathName}`);

  if (!fs.existsSync(folderPath)) return next(FILE_NOT_FOUND);

  const file = new AdmZip()
  file.addLocalFolder(`${UPLOAD_DIR}/${linkId}/${folder}`, folder)
  file.writeZip(folderPath + '.zip', () => {})

  res.send(pathName + '.zip')
});
