/*
  Warnings:

  - A unique constraint covering the columns `[characterId,slot]` on the table `CharacterArmor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slot` to the `CharacterArmor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `characterarmor` ADD COLUMN `slot` ENUM('Head', 'Chest', 'Legs', 'Arms', 'Feet') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CharacterArmor_characterId_slot_key` ON `CharacterArmor`(`characterId`, `slot`);
