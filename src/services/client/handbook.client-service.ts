import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { HandbookInputModel } from '../../models/input-models/handbook.input-model';
import { EventHandbookDetailViewModel } from '../../models/view-models/event-handbook-detail.view-model';
import { EventHandbookViewModel } from '../../models/view-models/event-handbook.view-model';

export const useHandbookClientService = () => {
  const getAllByEvent = (eventId: number): Promise<EventHandbookViewModel[]> =>
    http()
      .get(API_URLS.handbooks.getAllByEvent(eventId))
      .then((response) => response.data);

  const getById = (
    eventId: number,
    id: number
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .get(API_URLS.handbooks.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    data: HandbookInputModel
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .post(API_URLS.handbooks.create(eventId), data)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    data: HandbookInputModel
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .put(API_URLS.handbooks.update(eventId, id), data)
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
