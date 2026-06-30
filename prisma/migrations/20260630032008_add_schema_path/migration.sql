-- AlterTable
ALTER TABLE "File" ADD COLUMN     "filePath" TEXT,
ALTER COLUMN "fileUrl" DROP NOT NULL;
