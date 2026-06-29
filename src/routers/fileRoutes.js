import { Router } from "express";
import multer from "multer";
import {
  getFiles,
  getFile,
  postCreateFile,
  getCreateFile,
  postDeleteFile,
  postUpdateFile,
} from "../controllers/fileController.js";
import {
  ensureGuest,
  ensureAuthenticated,
} from "../middleware/authMiddleware.js";

const fileRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

fileRouter.get("/", ensureAuthenticated, getFiles);
fileRouter.get("/file/:fileId", ensureAuthenticated, getFile);
fileRouter.get("/add-file", ensureAuthenticated, getCreateFile);
fileRouter.post(
  "/add-file",
  upload.single("uploaded_file"),
  ensureAuthenticated,
  postCreateFile,
);
fileRouter.post("/delete-file/:fileId", ensureAuthenticated, postDeleteFile);
fileRouter.post("/update-file/:fileId", ensureAuthenticated, postUpdateFile);

export { fileRouter };
