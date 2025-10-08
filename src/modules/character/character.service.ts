import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { ArmorSlot } from '@prisma/client';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar personagem */
  async create(data: CreateCharacterInput) {
    if (!data.name?.trim()) throw new BadRequestException('Character name is required');

    try {
      return await this.prisma.character.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Error creating character');
    }
  }

  /** Buscar todos os personagens */
  async findAll() {
    return this.prisma.character.findMany({
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
        perks: true,
        inventory: { include: { item: true } },
      },
    });
  }

  /** Buscar personagem pelo ID */
  async findOne(id: string) {
    const character = await this.prisma.character.findUnique({
      where: { id },
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
        perks: true,
        inventory: { include: { item: true } },
      },
    });

    if (!character) throw new NotFoundException(`Character with ID ${id} not found`);
    return character;
  }

  /** Atualizar personagem */
  async update(id: string, data: UpdateCharacterInput) {
    try {
      return await this.prisma.character.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
  }

  /** Remover personagem */
  async remove(id: string) {
    try {
      return await this.prisma.character.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
  }

  /** EQUIP WEAPON */
  async equipWeapon(characterId: string, weaponId: string) {
    const character = await this.findOne(characterId);
    const weapon = await this.prisma.weapon.findUnique({ where: { id: weaponId } });
    if (!weapon) throw new NotFoundException('Weapon not found');

    try {
      await this.prisma.characterWeapon.upsert({
        where: { characterId_weaponId: { characterId, weaponId } },
        update: { equipped: true },
        create: { characterId, weaponId, equipped: true },
      });
      return this.findOne(characterId);
    } catch (error) {
      throw new InternalServerErrorException('Error equipping weapon');
    }
  }

  /** UNEQUIP WEAPON */
  async unequipWeapon(characterId: string, weaponId: string) {
    try {
      await this.prisma.characterWeapon.updateMany({
        where: { characterId, weaponId, equipped: true },
        data: { equipped: false },
      });
      return this.findOne(characterId);
    } catch (error) {
      throw new InternalServerErrorException('Error unequipping weapon');
    }
  }

  /** EQUIP ARMOR */
  async equipArmor(characterId: string, armorId: string, slot: string) {
    const character = await this.findOne(characterId);
    const armor = await this.prisma.armor.findUnique({ where: { id: armorId } });
    if (!armor) throw new NotFoundException('Armor not found');

    const slotEnum = slot as ArmorSlot;
    if (!Object.values(ArmorSlot).includes(slotEnum)) throw new BadRequestException('Invalid armor slot');

    try {
      await this.prisma.characterArmor.upsert({
        where: { characterId_armorId: { characterId, armorId } },
        update: { equipped: true, slot: slotEnum },
        create: { characterId, armorId, equipped: true, slot: slotEnum },
      });
      return this.findOne(characterId);
    } catch (error) {
      throw new InternalServerErrorException('Error equipping armor');
    }
  }

  /** UNEQUIP ARMOR BY SLOT */
  async unequipArmorSlot(characterId: string, slot: ArmorSlot) {
    try {
      await this.prisma.characterArmor.updateMany({
        where: { characterId, slot, equipped: true },
        data: { equipped: false },
      });
      return this.findOne(characterId);
    } catch (error) {
      throw new InternalServerErrorException('Error unequipping armor slot');
    }
  }

  /** UNEQUIP ALL ARMOR */
  async unequipAllArmor(characterId: string) {
    try {
      await this.prisma.characterArmor.updateMany({
        where: { characterId, equipped: true },
        data: { equipped: false },
      });
      return this.findOne(characterId);
    } catch (error) {
      throw new InternalServerErrorException('Error unequipping all armor');
    }
  }
}
