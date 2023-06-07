/*
  Warnings:

  - You are about to drop the column `employmentTypeId` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `employmenttype_id` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_employmentTypeId_fkey`;

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `employmentTypeId`,
    ADD COLUMN `employmenttype_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_employmenttype_id_fkey` FOREIGN KEY (`employmenttype_id`) REFERENCES `EmploymentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
