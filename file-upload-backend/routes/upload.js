import { Router } from "express";
import { uploadFiles } from "../controllers/upload";
import { getLinks, deleteLink } from "../controllers/links";

const router = Router();

router.get("/links", getLinks);
router.delete("/link/:id", deleteLink);
router.post("/upload/:id", uploadFiles);

export default router;
