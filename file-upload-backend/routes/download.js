import { Router } from "express";
import { downloadFile, downloadFolder, getFiles } from "../controllers/download";

const router = Router();


router.get("/files/:id", getFiles);
router.get("/download/:linkId/:folder", downloadFolder);
router.get("/download/:linkId/:folder/:filename", downloadFile);

export default router;