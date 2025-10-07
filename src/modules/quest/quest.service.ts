import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QuestCreateInput } from './dto/create-quest.input';
import { UpdateQuestInput } from './dto/update-quest.input';

@Injectable()
export class QuestService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: QuestCreateInput) {
        return this.prisma.quest.create({ data });
    }

    findAll() {
        return this.prisma.quest.findMany({
            include: { assignedTo: true }, 
        });
    }

    findOne(id: string) {
        return this.prisma.quest.findUnique({
            where: { id },
            include: { assignedTo: true },
        });
    }

    update(id: string, data: UpdateQuestInput) {
        return this.prisma.quest.update({
            where: { id },
            data,
        });
    }

    remove(id: string) {
        return this.prisma.quest.delete({ where: { id } });
    }
}
