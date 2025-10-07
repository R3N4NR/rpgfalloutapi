import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWeaponInput } from './dto/create-weapon.input';
import { UpdateWeaponInput } from './dto/update-weapon.input';

@Injectable()
export class WeaponService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateWeaponInput) {
        return this.prisma.weapon.create({ data });
    }

    findAll() {
        return this.prisma.weapon.findMany();
    }

    findOne(id: string) {
        return this.prisma.weapon.findUnique({ where: { id } });
    }

    update(id: string, data: UpdateWeaponInput) {
        return this.prisma.weapon.update({
            where: { id },
            data,
        });
    }

    remove(id: string) {
        return this.prisma.weapon.delete({ where: { id } });
    }
}
