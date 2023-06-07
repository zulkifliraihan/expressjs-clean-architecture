/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Role` DROP COLUMN `deleted_at`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;
