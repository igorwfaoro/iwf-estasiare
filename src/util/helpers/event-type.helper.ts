import { EventType } from '@prisma/client';

export const eventTypeLabel: { [key in EventType]: string } = {
  [EventType.WEDDING]: 'Casamento'
};

export const eventTypeList = Object.keys(eventTypeLabel);
