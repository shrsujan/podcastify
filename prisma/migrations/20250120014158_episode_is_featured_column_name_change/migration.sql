/*
  Warnings:

  - You are about to drop the column `featured` on the `Episode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "featured",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
