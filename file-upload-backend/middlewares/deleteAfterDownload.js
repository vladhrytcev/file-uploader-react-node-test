import rimraf from "rimraf";
import { UPLOAD_DIR } from "../helpers/uploadDir";

export const deleteZipAfterDownload = (req, res, next) => {
  const fileName = req.originalUrl.replace("/files", "");
  const fileExt = fileName.split(".").pop();
  const file = `${UPLOAD_DIR}/${fileName}`;
  req.connection.on("close", () => {
    if (fileExt === "zip") {
      rimraf(file, {}, () => {});
    }
  });
  next();
};
