import rimraf from "rimraf"

import { asyncHandler } from "../middlewares/async";
import { Link } from "../models/Link"
import { LINK_NOT_EXIST } from "../helpers/errors";
import { UPLOAD_DIR } from "../helpers/uploadDir";

export const getLinks = asyncHandler(async (req, res, next) => {
  const links = await Link.find()
  res.send(links);
});


export const deleteLink = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  if(!id) return next(LINK_NOT_EXIST)
  await Link.deleteOne({link: id})
  const dir = `${UPLOAD_DIR}/${id}/`;
  rimraf(dir, {}, () => {});

  res.status(200).send();
});
