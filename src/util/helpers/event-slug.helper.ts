import { eventTitleDescription } from './event-title-description.helper';
import { GenericEventParams } from '../types/generic-event';

export const eventSlug = (params: GenericEventParams): string => {
  const description = eventTitleDescription(params);

  return description
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};
