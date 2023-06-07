-- AlterTable
ALTER TABLE `Role` ALTER COLUMN `deleted_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `deleted_at` DROP DEFAULT;
