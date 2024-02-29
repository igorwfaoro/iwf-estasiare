import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { HandbookInputModel } from '../../models/input-models/handbook.input-model';
import { EventHandbookDetailViewModel } from '../../models/view-models/event-handbook-detail.view-model';
import { EventHandbookViewModel } from '../../models/view-models/event-handbook.view-model';

export const createHandbookClientService = () => {
  const getAllByEvent = (eventId: number): Promise<EventHandbookViewModel[]> =>
    http()
      .get(API_URLS.handbooks.getAllByEvent(eventId))
      .then((response) => response.data);

  const getById = (eventId: number, id: number): Promise<EventHandbookDetailViewModel> =>
    http()
      .get(API_URLS.handbooks.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    gift: HandbookInputModel
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .post(API_URLS.handbooks.create(eventId), gift)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    gift: HandbookInputModel
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .put(API_URLS.handbooks.update(eventId, id), gift)
      .then((response) => response.data);

  const remove = (eventId: number, id: number): Promise<void> =>
    http()
      .delete(API_URLS.handbooks.delete(eventId, id))
      .then((response) => response.data);

  return {
    getAllByEvent,
    getById,
    create,
    update,
    remove
  };
};
