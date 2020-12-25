import { asyncHandler } from "../middlewares/async";
import linksDB from "../helpers/linksDB";
import { LINK_NOT_EXIST } from "../helpers/errors";

export const getLinks = asyncHandler(async (req, res, next) => {
  res.send(linksDB);
});


export const deleteLinks = asyncHandler(async (req, res, next) => {
  const { id } = req.headers
  if(!id) return next(LINK_NOT_EXIST)
  delete linksDB[id]
  res.send(linksDB);
});
