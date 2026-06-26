import { prisma } from "../../lib/prisma.js";


// USERS
async function getUserByUsername(username) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function postNewUser(username, password) {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

// FILES
async function createFile(name, size, fileUrl, ownerId) {
  return await prisma.file.create({
    data: {
      name,
      size,
      fileUrl,
      ownerId,
    },
  });
}

async function deleteFile(fileId) {
  return await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
}

async function readFile(fileId) {
  return await prisma.file.findUnique({
    where: { id: fileId },
  });
}

async function readFiles() {
  return await prisma.file.findMany();
}

async function updateFile(fileId, name, size, fileUrl) {
  return await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      name,
      size,
      fileUrl,
    },
  });
}

export {
  getUserByUsername,
  getUserById,
  postNewUser,
  createFile,
  deleteFile,
  readFile,
  readFiles,
  updateFile,
};
