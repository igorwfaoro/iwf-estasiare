import { API_URLS } from '../constants/api-urls';
import { InvitationViewModel } from '../models/view-models/invitation.view-model';

export const createInvitationFetcher = () => {
  const getByCode = (code: string): Promise<InvitationViewModel> =>
    fetch(API_URLS.invitations.getByCode(code)).then((response) =>
      response.json()
    );

  const updateGuestsConfirmations = (
    invitationId: number,
    guests: { id: number; isConfirmed: boolean }[]
  ) =>
    fetch(API_URLS.invitations.updateGuestsConfirmations(), {
      method: 'PATCH',
      body: JSON.stringify({
        invitationId,
        guests,
      }),
    });

  return {
    getByCode,
    updateGuestsConfirmations,
  };
};
