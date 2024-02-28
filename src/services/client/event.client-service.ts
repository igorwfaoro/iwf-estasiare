import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { EventCreateInputModel } from '../../models/input-models/event-create.input-model';
import { EventUpdateInputModel } from '../../models/input-models/event-update.input-model';
import { EventDetailViewModel } from '../../models/view-models/event-detail.view-model';
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

  const getById = (id: number): Promise<EventDetailViewModel> =>
    http()
      .get(API_URLS.events.getById(id))
      .then((response) => response.data);

  const create = (
    input: EventCreateInputModel
  ): Promise<EventDetailViewModel> =>
    http()
      .post(API_URLS.events.create(), input)
      .then((response) => response.data);

  const update = (
    id: number,
    input: EventUpdateInputModel
  ): Promise<EventDetailViewModel> =>
    http()
      .put(API_URLS.events.update(id), input)
      .then((response) => response.data);

  return {
    search,
    recommended,
    getByUser,
    getById,
    create,
    update
  };
};
