export const API_BASE_URL = '/api';

export const API_URLS = {
  invitations: {
    getByCode: (code: string) =>
      `${API_BASE_URL}/invitations/get-by-code/${code}`,
    updateGuestsConfirmations: () =>
      `${API_BASE_URL}/invitations/update-guests-confirmations`,
  },
};
