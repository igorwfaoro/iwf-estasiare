export const API_BASE_URL = '/api';

export const API_URLS = {
  events: {
    search: () => `${API_BASE_URL}/events/search`,
    recommended: () => `${API_BASE_URL}/events/recommended`
  },
  invitations: {
    getByDescription: () => `${API_BASE_URL}/invitations/get-by-description`,
    updateGuestsConfirmations: () =>
      `${API_BASE_URL}/invitations/update-guests-confirmations`
  }
};
