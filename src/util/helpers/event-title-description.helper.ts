import { EventType } from '.prisma/client';
import { GenericEventParams } from '../types/generic-event';
import { eventTypeLabel } from './event-type.helper';

export const eventTitleDescription = ({
  eventType,
  weddingDetail
}: GenericEventParams): string =>
  ({
    [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${[
      weddingDetail?.groomName,
      weddingDetail?.brideName
    ]
      .sort()
      .join(' & ')}`
  })[eventType];
