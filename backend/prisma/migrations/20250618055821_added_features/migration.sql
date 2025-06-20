/*
  Warnings:

  - Added the required column `imageURL` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvotes` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "imageURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL;
