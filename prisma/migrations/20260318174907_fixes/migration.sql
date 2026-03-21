/*
  Warnings:

  - Added the required column `descMeta` to the `Metas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo` to the `Metas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metas" ADD COLUMN     "descMeta" TEXT NOT NULL,
ADD COLUMN     "objetivo" INTEGER NOT NULL;
