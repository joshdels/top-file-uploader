import { Router } from "express";
import {
  postCreateFile,
  postDeleteFile,
  getFile,
  getFiles,
  postUpdateFile,
} from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.post("/add-file", postCreateFile);
fileRouter.post("/delete-file/:fileId", postDeleteFile);
fileRouter.get("/file/:fileId", getFile);
fileRouter.get("/files", getFiles);
fileRouter.post("/update-file/:fileId", postUpdateFile);

export { fileRouter };
