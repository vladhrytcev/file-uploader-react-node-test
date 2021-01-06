import { Router } from "express";
import { uploadFiles } from "../controllers/upload";
import { getLinks, deleteLink } from "../controllers/links";
import fileUpload from "express-fileupload";

const router = Router();

const uploadOptions = {
  uploadTimeout: 10000,
  useTempFiles: true,
};

router.get("/links", getLinks);
router.delete("/link/:id", deleteLink);
router.post("/upload/:id", fileUpload(uploadOptions), uploadFiles);

export default router;
