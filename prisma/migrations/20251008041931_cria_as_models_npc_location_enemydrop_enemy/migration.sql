/*
  Warnings:

  - Made the column `weight` on table `armor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `armor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `armor` MODIFY `type` ENUM('Heavy', 'Light', 'Medium', 'PowerArmor') NOT NULL,
    MODIFY `weight` DOUBLE NOT NULL,
    MODIFY `rarity` ENUM('Common', 'Epic', 'Legendary', 'Rare', 'Uncommon') NOT NULL,
    MODIFY `slot` ENUM('Arms', 'Chest', 'Feet', 'Head', 'Legs') NOT NULL;

-- AlterTable
ALTER TABLE `character` ADD COLUMN `locationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `characterarmor` MODIFY `slot` ENUM('Arms', 'Chest', 'Feet', 'Head', 'Legs') NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `type` ENUM('Aid', 'Ammo', 'Consumable', 'Material', 'Quest') NOT NULL;

-- AlterTable
ALTER TABLE `quest` ADD COLUMN `locationId` VARCHAR(191) NULL,
    MODIFY `status` ENUM('Completed', 'Failed', 'InProgress', 'Pending') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `weapon` MODIFY `type` ENUM('Energy', 'Explosive', 'Heavy', 'Melee', 'Pistol', 'Rifle') NOT NULL;

-- CreateTable
CREATE TABLE `Enemy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `damage` INTEGER NOT NULL,
    `hitPoints` INTEGER NOT NULL DEFAULT 100,
    `resistances` ENUM('Bleed', 'Radiation', 'Energy', 'Physical') NOT NULL,
    `type` ENUM('Animal', 'Humanoid', 'SuperMutant', 'Ghoul', 'Robot', 'Human') NOT NULL,
    `hostile` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Enemy_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnemyDrop` (
    `id` VARCHAR(191) NOT NULL,
    `dropRate` DOUBLE NOT NULL DEFAULT 0.0,
    `enemyId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `spawnType` ENUM('Animal', 'Humanoid', 'SuperMutant', 'Ghoul', 'Robot', 'Human') NOT NULL,
    `discovered` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Location_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Npc` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dialogue` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `locationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Npc_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnemyDrop` ADD CONSTRAINT `EnemyDrop_enemyId_fkey` FOREIGN KEY (`enemyId`) REFERENCES `Enemy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnemyDrop` ADD CONSTRAINT `EnemyDrop_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Npc` ADD CONSTRAINT `Npc_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quest` ADD CONSTRAINT `Quest_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
