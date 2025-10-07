import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharacterService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateCharacterInput) {
        return this.prisma.character.create({ data });
    }

    findAll() {
        return this.prisma.character.findMany({
            include: {
                weapons: true,
                armors: true,
                perks: true,
                inventory: { include: { item: true } },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.character.findUnique({
            where: { id },
            include: {
                weapons: true,
                armors: true,
                perks: true,
                inventory: { include: { item: true } }
            },
        });
    }

    update(id: string, data: UpdateCharacterInput) {
        return this.prisma.character.update({
            where: { id },
            data,
        });
    }

    remove(id: string) {
        return this.prisma.character.delete({ where: { id } });
    }
}
