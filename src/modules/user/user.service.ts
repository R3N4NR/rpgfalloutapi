import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /** Criar novo usuário */
  async create(data: CreateUserInput): Promise<User> {
    if (!data.name?.trim()) {
      throw new BadRequestException('User name is required');
    }

    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Database error creating user');
      }
      throw new InternalServerErrorException('Unexpected error creating user');
    }
  }

  /** Buscar todos os usuários */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /** Buscar um usuário pelo ID */
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /** Atualizar usuário */
  async update(id: string, data: UpdateUserInput): Promise<User> {
    if (data.name && !data.name.trim()) {
      throw new BadRequestException('User name cannot be empty');
    }

    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error updating user');
    }
  }

  /** Remover usuário */
  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
