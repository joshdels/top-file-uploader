import {
  createFile,
  deleteFile,
  readFile,
  readFiles,
  updateFile,
} from "../db/queries.js";

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
    const sizeInBytes = req.file.size;

    // To finish setup laterrrrr
    await createFile(file_name, sizeInBytes, "testing_url_cloud", ownerId);
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postDeleteFile(req, res) {
  try {
    const { fileId } = req.params;
    const fileIdInt = parseInt(fileId, 10);

    await deleteFile(fileIdInt);
    
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
    // to fill later
    const files = await readFiles();

    res.render("index", {
      user: req.user,
      files: files,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postUpdateFile(req, res) {
  try {
    const { fileId } = req.params;
    const { name, size, fileUrl } = req.body;

    await updateFile(fileId, name, size, fileUrl);
    res.redirect("/");
    return file;
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
  postUpdateFile,
};
