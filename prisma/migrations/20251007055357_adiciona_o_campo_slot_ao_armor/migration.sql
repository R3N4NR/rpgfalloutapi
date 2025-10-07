/*
  Warnings:

  - Added the required column `slot` to the `Armor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `armor` ADD COLUMN `slot` ENUM('Head', 'Chest', 'Legs', 'Arms', 'Feet') NOT NULL;
