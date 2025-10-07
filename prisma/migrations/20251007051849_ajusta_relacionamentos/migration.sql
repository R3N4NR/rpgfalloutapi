/*
  Warnings:

  - A unique constraint covering the columns `[characterId,armorId]` on the table `CharacterArmor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId,weaponId]` on the table `CharacterWeapon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CharacterArmor_characterId_armorId_key` ON `CharacterArmor`(`characterId`, `armorId`);

-- CreateIndex
CREATE UNIQUE INDEX `CharacterWeapon_characterId_weaponId_key` ON `CharacterWeapon`(`characterId`, `weaponId`);
