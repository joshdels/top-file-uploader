import {
  createFile,
  deleteFile,
  readFile,
  readFiles,
  updateFile,
} from "../db/queries.js";

async function postCreateFile(req, res) {
  try {
    const { name, size, fileUrl, ownerId } = req.body;
    const file = await createFile(name, size, fileUrl, ownerId);
    return file;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postDeleteFile(req, res) {
  try {
    const { fileId } = req.body;
    const file = await deleteFile(fileId);
    return file;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFile(req, res) {
  try {
    const { fileId } = req.body;
    const file = await readFile(fileId);

    return file;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFiles(req, res) {
  try {
    const { fileId } = req.body;
    const files = await readFiles(fileId);
   
    res.render()

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postUpdateFile(req, res) {
  try {
    const { fileId, name, size, fileUrl } = req.body;
    const file = await updateFile(fileId);

    res.redirect("/")
    return file;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { postCreateFile, postDeleteFile, getFile, getFiles, postUpdateFile };
