import { GenericEventParams } from '../types/generic-event';
import { eventTitleDescription } from './event-title-description.helper';

export const eventSlug = (params: GenericEventParams): string => {
  const description = eventTitleDescription(params);

  return description
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};
