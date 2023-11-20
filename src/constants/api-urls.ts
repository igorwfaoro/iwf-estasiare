export const API_BASE_URL = '/api';

export const API_URLS = {
  invitations: {
    getByDescription: () => `${API_BASE_URL}/invitations/get-by-description`,
    updateGuestsConfirmations: () =>
      `${API_BASE_URL}/invitations/update-guests-confirmations`,
  },
};
