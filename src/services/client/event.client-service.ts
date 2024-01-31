import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { EventViewModel } from '../../models/view-models/event.view-model';

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
    http()
      .get(API_URLS.events.search(), {
        params: {
          ...(q && { q }),
          ...(index !== undefined && { index: String(index) }),
          ...(limit !== undefined && { limit: String(limit) })
        }
      })
      .then((response) => response.data);

  const recommended = (limit?: number): Promise<EventViewModel[]> =>
    http()
      .get(API_URLS.events.recommended(), {
        params: {
          ...(limit !== undefined && { limit: String(limit) })
        }
      })
      .then((response) => response.data);

  const getByUser = (): Promise<EventViewModel[]> =>
    http()
      .get(API_URLS.events.getByUser())
      .then((response) => response.data);

  return {
    search,
    recommended,
    getByUser
  };
};
