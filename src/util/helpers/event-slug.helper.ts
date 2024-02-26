import { EventType, EventWeddingDetail } from '.prisma/client';
import { EventTitleDescriptionParams, eventTitleDescription } from './event-title-description.helper';

export const eventSlug = (params: EventTitleDescriptionParams): string => {
  const description = eventTitleDescription(params);

  return description
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};
