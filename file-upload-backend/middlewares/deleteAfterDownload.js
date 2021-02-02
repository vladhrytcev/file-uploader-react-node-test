import rimraf from "rimraf";
import { UPLOAD_DIR } from "../helpers/uploadDir";

export const deleteZipAfterDownload = (req, res, next) => {
  const { download } = req.query;
  const fileName = req.originalUrl.replace("/files", "").split('?')[0];
  const fileExt = fileName.split(".").pop();
  const file = `${UPLOAD_DIR}/${fileName}`;

  if (fileExt === "pdf" && download !== "true")
    res.setHeader("content-disposition", "inline");
  else res.setHeader("content-disposition", "attachment");

  req.connection.on("close", () => {
    if (fileExt === "tar") {
      rimraf(file, {}, () => {});
    }
  });
  next();
};
