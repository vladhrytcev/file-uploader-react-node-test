import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs";
import { UPLOAD_DIR } from "./helpers/uploadDir";

import { errorHandler } from "./middlewares/errorHandler";
import uploadRouter from "./routes/upload";
import downloadRouter from "./routes/download";

const app = express();

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const port = process.env.PORT || 8000;

app.set('trust proxy', true)
app.use(express.json({ extended: true }));
app.use(fileUpload({}));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", uploadRouter, downloadRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port} port`));
