import { Injectable, BadRequestException, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Weapon } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWeaponInput } from './dto/create-weapon.input';
import { UpdateWeaponInput } from './dto/update-weapon.input';

@Injectable()
export class WeaponService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar arma */
  async create(data: CreateWeaponInput): Promise<Weapon> {
    if (!data.name?.trim()) throw new BadRequestException('Weapon name is required');

    try {
      return await this.prisma.weapon.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Weapon name already exists');
      }
      throw new InternalServerErrorException('Error creating weapon');
    }
  }

  /** Buscar todas as armas */
  async findAll(): Promise<Weapon[]> {
    return this.prisma.weapon.findMany();
  }

  /** Buscar arma pelo ID */
  async findOne(id: string): Promise<Weapon> {
    const weapon = await this.prisma.weapon.findUnique({ where: { id } });
    if (!weapon) throw new NotFoundException(`Weapon with ID ${id} not found`);
    return weapon;
  }

  /** Atualizar arma */
  async update(id: string, data: UpdateWeaponInput): Promise<Weapon> {
    try {
      return await this.prisma.weapon.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new NotFoundException(`Weapon with ID ${id} not found`);
        if (error.code === 'P2002') throw new ConflictException('Weapon name already exists');
      }
      throw new InternalServerErrorException('Error updating weapon');
    }
  }

  /** Remover arma */
  async remove(id: string): Promise<Weapon> {
    try {
      return await this.prisma.weapon.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Weapon with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error removing weapon');
    }
  }
}
