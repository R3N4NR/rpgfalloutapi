
import { ArmorSlot } from '@prisma/client';
import { UpdateCharacterInput } from './dto/update-character.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCharacterInput } from './dto/create-character.input';

@Injectable()
export class CharacterService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateCharacterInput) {
        return this.prisma.character.create({ data });
    }

    findAll() {
        return this.prisma.character.findMany({
            include: {
                weapons: { include: { weapon: true } },
                armors: { include: { armor: true } },
                perks: true,
                inventory: { include: { item: true } },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.character.findUnique({
            where: { id },
            include: {
                weapons: { include: { weapon: true } },
                armors: { include: { armor: true } },
                perks: true,
                inventory: { include: { item: true } },
            },
        });
    }

    update(id: string, data: UpdateCharacterInput) {
        return this.prisma.character.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.character.delete({ where: { id } });
    }

    /** EQUIP WEAPON */
    async equipWeapon(characterId: string, weaponId: string) {
        // Verifica se character e weapon existem
        const character = await this.prisma.character.findUnique({ where: { id: characterId } });
        const weapon = await this.prisma.weapon.findUnique({ where: { id: weaponId } });

        if (!character || !weapon) throw new Error('Character or Weapon not found');

        // Cria ou atualiza a relação na tabela CharacterWeapon
        await this.prisma.characterWeapon.upsert({
            where: {
                characterId_weaponId: { characterId, weaponId },
            },
            update: { equipped: true },
            create: {
                character: { connect: { id: characterId } },
                weapon: { connect: { id: weaponId } },
                equipped: true,
            },
        });

        // Retorna o Character atualizado
        return this.findOne(characterId);
    }

    /** UNEQUIP WEAPON */
    async unequipWeapon(characterId: string, weaponId: string) {
        await this.prisma.characterWeapon.updateMany({
            where: { characterId, weaponId, equipped: true },
            data: { equipped: false },
        });
        return this.findOne(characterId);
    }

    /** EQUIP ARMOR */

    async equipArmor(characterId: string, armorId: string, slot: string) {
        
        const slotEnum = slot as ArmorSlot;
        if (!Object.values(ArmorSlot).includes(slotEnum)) throw new Error('Invalid slot value');
        await this.prisma.characterArmor.upsert({
            where: { characterId_armorId: { characterId, armorId } },
            update: { equipped: true, slot: slotEnum },
            create: {
                characterId,
                armorId,
                equipped: true,
                slot: slotEnum,
            },
        });
        return this.findOne(characterId);
    }

    async unequipArmorSlot(characterId: string, slot: ArmorSlot) {
        await this.prisma.characterArmor.updateMany({
            where: { characterId, slot, equipped: true },
            data: { equipped: false },
        });

        return this.findOne(characterId);
    }

    async unequipAllArmor(characterId: string) {
        await this.prisma.characterArmor.updateMany({
            where: { characterId, equipped: true },
            data: { equipped: false },
        });

        return this.findOne(characterId);
    }
}