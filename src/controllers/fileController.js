import {
  createFile,
  deleteFile,
  readFile,
  readFiles,
  updateFile,
} from "../db/queries.js";
import { deleteStoredFile, uploadFile } from "../services/storage.js";

async function getCreateFile(req, res) {
  res.render("forms/addFile-form");
}

async function postCreateFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const ownerId = req.user.id;

    const { file_name } = req.body;
    const size = req.file ? req.file.size / (1024 * 1024) : currentFile.size;

    const upload = await uploadFile(req.file, file_name);
    await createFile(file_name, size, upload.url, upload.path, ownerId);

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postDeleteFile(req, res) {
  try {
    const { fileId, filePath } = req.params;
    const fileIdInt = parseInt(fileId, 10);

    await deleteFile(fileIdInt);
    await deleteStoredFile(filePath);

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFile(req, res) {
  try {
    const { fileId } = req.body;
    const file = await readFile(fileId);

    res.render("path-?", { file: file, user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFiles(req, res) {
  try {
    const userId = req.user.id;
    const files = await readFiles();

    res.render("index", {
      user: req.user,
      files: files,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUpdateFile(req, res) {
  const { fileId } = req.params;

  const fileIdInt = parseInt(fileId, 10);
  const file = await readFile(fileIdInt);

  res.render("forms/editFile-form", {
    file: file,
  });
}

async function postUpdateFile(req, res) {
  try {
    const { file_name } = req.body;
    const { fileId } = req.params;
    const fileIdInt = parseInt(fileId, 10);

    const currentFile = await readFile(fileIdInt);

    let size = currentFile.size;
    let fileUrl = currentFile.fileUrl;
    let filePath = currentFile.filePath;

    if (req.file) {
      const upload = await uploadFile(req.file, req.file.originalname);

      await deleteStoredFile(currentFile.filePath);

      size = req.file.size / (1024 * 1024);
      fileUrl = upload.url;
      filePath = upload.path;
    }

    await updateFile(fileIdInt, file_name, size, fileUrl, filePath);

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export {
  getCreateFile,
  postCreateFile,
  postDeleteFile,
  getFile,
  getFiles,
  getUpdateFile,
  postUpdateFile,
};
