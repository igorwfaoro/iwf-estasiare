import { GenericEventParams } from '../types/generic-event';
import { eventTitleDescription } from './event-title-description.helper';

export const eventSlug = (params: GenericEventParams) =>
  normalizeSlug(eventTitleDescription(params));

export const normalizeSlug = (
  value: string,
  options: { ignoreStartEndHyphen?: boolean } = {}
) => {
  let result = value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  if (!options.ignoreStartEndHyphen) result = result.replace(/^-+|-+$/g, '');

  return result;
};
