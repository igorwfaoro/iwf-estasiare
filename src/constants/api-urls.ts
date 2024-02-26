export const API_BASE_URL = '/api';

export const API_URLS = {
  events: {
    search: () => `${API_BASE_URL}/events/search`,
    recommended: () => `${API_BASE_URL}/events/recommended`,
    getByUser: () => `${API_BASE_URL}/events/getByUser`,
    create: () => `${API_BASE_URL}/events`
  },
  invitations: {
    getByDescription: () => `${API_BASE_URL}/invitations/get-by-description`,
    updateGuestsConfirmations: () =>
      `${API_BASE_URL}/invitations/update-guests-confirmations`
  },
  gifts: {
    getAllByEvent: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/gifts`,
    getById: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gifts/${id}`,
    create: (eventId: number) => `${API_BASE_URL}/events/${eventId}/gifts`,
    update: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gifts/${id}`,
    delete: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gifts/${id}`
  }
};
