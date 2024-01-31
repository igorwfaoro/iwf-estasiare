import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { GiftInputModel } from '../../models/input-models/gift.input-model';
import { GiftViewModel } from '../../models/view-models/gift.view-model';

export const createGiftClientService = () => {
  const getAllByEvent = (eventId: number): Promise<GiftViewModel[]> =>
    http()
      .get(API_URLS.gifts.getAllByEvent(eventId))
      .then((response) => response.data);

  const getById = (eventId: number, id: number): Promise<GiftViewModel> =>
    http()
      .get(API_URLS.gifts.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    gift: GiftInputModel
  ): Promise<GiftViewModel> =>
    http()
      .post(API_URLS.gifts.create(eventId), gift)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    gift: GiftInputModel
  ): Promise<GiftViewModel> =>
    http()
      .put(API_URLS.gifts.update(eventId, id), gift)
      .then((response) => response.data);

  const remove = (eventId: number, id: number): Promise<void> =>
    http()
      .delete(API_URLS.gifts.delete(eventId, id))
      .then((response) => response.data);

  return {
    getAllByEvent,
    getById,
    create,
    update,
    remove
  };
};
