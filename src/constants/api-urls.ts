export const API_BASE_URL = '/api';

export const API_URLS = {
  events: {
    search: () => `${API_BASE_URL}/events/search`,
    recommended: () => `${API_BASE_URL}/events/recommended`,
    getByUser: () => `${API_BASE_URL}/events/by-user`,
    getById: (id: number) => `${API_BASE_URL}/events/${id}`,
    create: () => `${API_BASE_URL}/events`,
    update: (id: number) => `${API_BASE_URL}/events/${id}`
  },
  invitations: {
    searchByGuestName: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations/by-guest-name`,
    getAllByEvent: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations`,
    getById: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations/${id}`,
    create: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations`,
    update: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations/${id}`,
    delete: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations/${id}`,
    updateGuestsConfirmations: (eventId: number, invitationId: number) =>
      `${API_BASE_URL}/events/${eventId}/invitations/${invitationId}/guests/confirmations`
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
  },
  handbooks: {
    getAllByEvent: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/handbooks`,
    getById: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/handbooks/${id}`,
    create: (eventId: number) => `${API_BASE_URL}/events/${eventId}/handbooks`,
    update: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/handbooks/${id}`,
    delete: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/handbooks/${id}`
  },
  giftRegistries: {
    getAllByEvent: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/gift-registries`,
    getById: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gift-registries/${id}`,
    create: (eventId: number) =>
      `${API_BASE_URL}/events/${eventId}/gift-registries`,
    update: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gift-registries/${id}`,
    delete: (eventId: number, id: number) =>
      `${API_BASE_URL}/events/${eventId}/gift-registries/${id}`
  },
  providers: {
    create: () => `${API_BASE_URL}/providers`,
    update: () => `${API_BASE_URL}/providers`,
    slugAlreadyExists: (slug: string) =>
      `${API_BASE_URL}/providers/slug/already-exists/${slug}`,
    search: () => `${API_BASE_URL}/providers`,
    categories: {
      getAll: () => `${API_BASE_URL}/providers/categories`
    },
    links: {
      getAllByProvider: () => `${API_BASE_URL}/providers/links`,
      create: () => `${API_BASE_URL}/providers/links`,
      update: (id: number) => `${API_BASE_URL}/providers/links/${id}`,
      reorder: () => `${API_BASE_URL}/providers/links/reorder`,
      delete: (id: number) => `${API_BASE_URL}/providers/links/${id}`
    },
    linkTypes: {
      getAll: () => `${API_BASE_URL}/providers/link-types`
    }
  },
  users: {
    update: () => `${API_BASE_URL}/users`
  }
};
