import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { EventHandbookDetailViewModel } from '../../models/view-models/event-handbook-detail.view-model';

export const createHandbookClientService = () => {
  const getById = (
    eventId: number,
    id: number
  ): Promise<EventHandbookDetailViewModel> =>
    http()
      .get(API_URLS.handbooks.getById(eventId, id))
      .then((response) => response.data);

  return {
    getById
  };
};
