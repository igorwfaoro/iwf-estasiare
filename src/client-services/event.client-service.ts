import { API_URLS } from '../constants/api-urls';
import { EventViewModel } from '../models/view-models/event.view-model';

export const createEventClientService = () => {
  const search = ({
    q,
    index,
    limit
  }: {
    q?: string;
    index?: number;
    limit?: number;
  }): Promise<EventViewModel[]> =>
    fetch(
      `${API_URLS.events.search()}?${new URLSearchParams({
        ...(q && { q }),
        ...(index !== undefined && { index: String(index) }),
        ...(limit !== undefined && { limit: String(limit) })
      })}`
    ).then((response) => response.json());

  const recommended = (limit?: number): Promise<EventViewModel[]> =>
    fetch(
      `${API_URLS.events.recommended()}?${new URLSearchParams({
        ...(limit !== undefined && { limit: String(limit) })
      })}`
    ).then((response) => response.json());

  const getByUser = (): Promise<EventViewModel[]> =>
    fetch(API_URLS.events.getByUser()).then((response) => response.json());

  return {
    search,
    recommended,
    getByUser
  };
};
