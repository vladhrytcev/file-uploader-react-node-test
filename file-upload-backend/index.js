import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

import { UPLOAD_DIR } from "./helpers/uploadDir";
import { connectDB } from "./database";
import { errorHandler } from "./middlewares/errorHandler";
import { deleteZipAfterDownload } from "./middlewares/deleteAfterDownload";
import uploadRouter from "./routes/upload";
import downloadRouter from "./routes/download";

const app = express();
dotenv.config();

connectDB();

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const port = process.env.PORT || 8000;

app.set("trust proxy", true);
app.use(express.json({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", uploadRouter, downloadRouter);
app.use('/files', deleteZipAfterDownload, express.static(__dirname + "/uploads"));

app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port} port`));
