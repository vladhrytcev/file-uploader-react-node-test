import { Router } from "express";
import { getFiles, uploadFiles } from "../controllers/upload";
import { getLinks, deleteLinks } from "../controllers/links";

const router = Router();

router.get("/", getFiles);
router.get("/links", getLinks);
router.delete("/links", deleteLinks);
router.post("/upload", uploadFiles);

export default router;
