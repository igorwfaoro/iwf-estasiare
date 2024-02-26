import { EventType } from '.prisma/client';
import { eventTypeLabel } from './event-type.helper';
import { GenericEventParams } from '../types/generic-event';

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
