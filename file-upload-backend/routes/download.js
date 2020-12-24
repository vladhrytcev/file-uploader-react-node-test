import { Router } from "express";
import { downloadFile, downloadFolder } from "../controllers/download";

const router = Router();

router.get("/download/:folder", downloadFolder);
router.get("/download/:folder/:filename", downloadFile);

export default router;