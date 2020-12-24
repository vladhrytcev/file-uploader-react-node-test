import { asyncHandler } from "../middlewares/async";
import linksDB from "../helpers/linksDB";

export const getLinks = asyncHandler(async (req, res, next) => {
  res.send(linksDB);
});
