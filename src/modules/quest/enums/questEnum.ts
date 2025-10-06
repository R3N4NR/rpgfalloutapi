
export enum QuestStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
}
import { registerEnumType } from '@nestjs/graphql';
registerEnumType(QuestStatus, { name: 'QuestStatus' });
