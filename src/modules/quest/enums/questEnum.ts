import { registerEnumType } from '@nestjs/graphql';
import { QuestStatus as PrismaQuestStatus } from '@prisma/client';

export { PrismaQuestStatus as QuestStatus };

registerEnumType(PrismaQuestStatus, { name: 'QuestStatus' });
