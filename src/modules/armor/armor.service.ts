import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArmorInput } from './dto/create-armor.input';
import { UpdateArmorInput } from './dto/update-armor.input';
import { Armor, ArmorSlot } from '@prisma/client';

@Injectable()
export class ArmorService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar nova armadura */
  async create(data: CreateArmorInput): Promise<Armor> {
    if (!Object.values(ArmorSlot).includes(data.slot)) {
      throw new BadRequestException(`Invalid armor slot: ${data.slot}`);
    }

    return this.prisma.armor.create({
      data: {
        name: data.name,
        type: data.type,
        slot: data.slot,
        defense: data.defense,
        weight: data.weight,
        value: data.value,
        rarity: data.rarity,
      },
    });
  }

  /** Buscar todas as armaduras */
  findAll(): Promise<Armor[]> {
    return this.prisma.armor.findMany();
  }

  /** Buscar uma armadura pelo ID */
  async findOne(id: string): Promise<Armor> {
    const armor = await this.prisma.armor.findUnique({ where: { id } });
    if (!armor) throw new NotFoundException(`Armor with ID ${id} not found`);
    return armor;
  }

  /** Atualizar armadura */
  async update(id: string, data: UpdateArmorInput): Promise<Armor> {
    if (data.slot && !Object.values(ArmorSlot).includes(data.slot)) {
      throw new BadRequestException(`Invalid armor slot: ${data.slot}`);
    }

    return this.prisma.armor.update({
      where: { id },
      data,
    });
  }

  /** Remover armadura */
  async remove(id: string): Promise<Armor> {
    try {
      return await this.prisma.armor.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Armor with ID ${id} not found`);
    }
  }
}
