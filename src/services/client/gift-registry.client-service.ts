import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { GiftRegistryInputModel } from '../../models/input-models/gift-registry.input-model';
import { GiftRegistryViewModel } from '../../models/view-models/gift-registry.view-model';

export const useGiftRegistryClientService = () => {
  const getAllByEvent = (eventId: number): Promise<GiftRegistryViewModel[]> =>
    http()
      .get(API_URLS.giftRegistries.getAllByEvent(eventId))
      .then((response) => response.data);

  const getById = (
    eventId: number,
    id: number
  ): Promise<GiftRegistryViewModel> =>
    http()
      .get(API_URLS.giftRegistries.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    data: GiftRegistryInputModel
  ): Promise<GiftRegistryViewModel> =>
    http()
      .post(API_URLS.giftRegistries.create(eventId), data)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    data: Partial<GiftRegistryInputModel>
  ): Promise<GiftRegistryViewModel> =>
    http()
      .put(API_URLS.giftRegistries.update(eventId, id), data)
      .then((response) => response.data);

  const remove = (eventId: number, id: number): Promise<void> =>
    http()
      .delete(API_URLS.giftRegistries.delete(eventId, id))
      .then((response) => response.data);

  return {
    getAllByEvent,
    getById,
    create,
    update,
    remove
  };
};
