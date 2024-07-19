import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { GiftViewModel } from '../../models/view-models/gift.view-model';

export const useGiftClientService = () => {
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
    gift: GiftInputModel,
    imageFile: File
  ): Promise<GiftViewModel> => {
    const body = new FormData();

    body.append('data', JSON.stringify(gift));
    body.append('fileImage', imageFile);

    return http()
      .post(API_URLS.gifts.create(eventId), body)
      .then((response) => response.data);
  };

  const update = (
    eventId: number,
    id: number,
    gift: GiftInputModel,
    imageFile: File | undefined
  ): Promise<GiftViewModel> => {
    const body = new FormData();

    body.append('data', JSON.stringify(gift));

    if (imageFile) body.append('fileImage', imageFile);

    return http()
      .put(API_URLS.gifts.update(eventId, id), body)
      .then((response) => response.data);
  };

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
