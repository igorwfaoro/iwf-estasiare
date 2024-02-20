import { EventType } from '@prisma/client';

export const eventTypeLabel = {
  [EventType.WEDDING]: 'Casamento'
};

export const eventTypeList = Object.keys(eventTypeLabel);
