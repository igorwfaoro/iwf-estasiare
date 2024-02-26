import { EventType } from '.prisma/client';
import { eventTypeLabel } from './event-type.helper';

export interface EventTitleDescriptionParams {
  eventType: EventType;
  weddingDetail?: {
    groomName: string;
    brideName: string;
  } | null;
}

export const eventTitleDescription = ({
  eventType,
  weddingDetail
}: EventTitleDescriptionParams): string =>
  ({
    [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${[
      weddingDetail?.groomName,
      weddingDetail?.brideName
    ]
      .sort()
      .join(' & ')}`
  })[eventType];
