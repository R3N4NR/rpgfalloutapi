import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArmorInput } from './dto/create-armor.input';
import { UpdateArmorInput } from './dto/update-armor.input';

@Injectable()
export class ArmorService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateArmorInput) {
        return this.prisma.armor.create({ data });
    }

    findAll() {
        return this.prisma.armor.findMany();
    }

    findOne(id: string) {
        return this.prisma.armor.findUnique({ where: { id } });
    }

    update(id: string, data: UpdateArmorInput) {
        return this.prisma.armor.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.armor.delete({ where: { id } });
    }
}
