/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Role` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted_at` TIMESTAMP(3) NULL;
