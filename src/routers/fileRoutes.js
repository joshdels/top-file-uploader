import { Router } from "express";
import multer from "multer";
import {
  getFiles,
  getFile,
  postCreateFile,
  getCreateFile,
  postDeleteFile,
  getUpdateFile,
  postUpdateFile,
} from "../controllers/fileController.js";
import {
  ensureGuest,
  ensureAuthenticated,
} from "../middleware/authMiddleware.js";

const fileRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });
const file = upload.single("uploaded_file");

fileRouter.get("/", ensureAuthenticated, getFiles);
fileRouter.get("/file/:fileId", ensureAuthenticated, getFile);
fileRouter.get("/add-file", ensureAuthenticated, getCreateFile);
fileRouter.post("/add-file", file, ensureAuthenticated, postCreateFile);
fileRouter.post("/delete-file/:fileId/:filePath", ensureAuthenticated, postDeleteFile);
fileRouter.get("/update-file/:fileId/:filePath", ensureAuthenticated, getUpdateFile);
fileRouter.post("/update-file/:fileId/:filePath", file, ensureAuthenticated, postUpdateFile);

export { fileRouter };
