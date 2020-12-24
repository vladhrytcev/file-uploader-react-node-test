import { Router } from "express";
import { getFiles, uploadFiles } from "../controllers/upload";
import { getLinks } from "../controllers/links";

const router = Router();

router.get("/", getFiles);
router.get("/links", getLinks);
router.post("/upload", uploadFiles);

export default router;
