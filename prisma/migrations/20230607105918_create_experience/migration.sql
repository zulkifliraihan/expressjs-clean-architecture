-- CreateTable
CREATE TABLE `Experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employmentTypeId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `current_work` BOOLEAN NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_employmentTypeId_fkey` FOREIGN KEY (`employmentTypeId`) REFERENCES `EmploymentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
