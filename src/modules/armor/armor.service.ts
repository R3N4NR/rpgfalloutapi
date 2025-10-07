import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArmorInput } from './dto/create-armor.input';
import { UpdateArmorInput } from './dto/update-armor.input';
import { ArmorSlot } from '@prisma/client'; 

@Injectable()
export class ArmorService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar nova armadura */
  async create(data: CreateArmorInput) {
   
    if (!Object.values(ArmorSlot).includes(data.slot)) {
      throw new Error(`Invalid armor slot: ${data.slot}`);
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
  findAll() {
    return this.prisma.armor.findMany();
  }

  /** Buscar uma armadura pelo ID */
  findOne(id: string) {
    return this.prisma.armor.findUnique({ where: { id } });
  }

  /** Atualizar armadura */
  async update(id: string, data: UpdateArmorInput) {
  
    if (data.slot && !Object.values(ArmorSlot).includes(data.slot)) {
      throw new Error(`Invalid armor slot: ${data.slot}`);
    }

    return this.prisma.armor.update({
      where: { id },
      data,
    });
  }

  /** Remover armadura */
  remove(id: string) {
    return this.prisma.armor.delete({ where: { id } });
  }
}
