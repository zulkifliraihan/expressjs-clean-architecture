-- AlterTable
ALTER TABLE `Role` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deleted_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deleted_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
