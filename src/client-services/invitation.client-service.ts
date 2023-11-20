import { API_URLS } from '../constants/api-urls';
import { InvitationViewModel } from '../models/view-models/invitation.view-model';

export const createInvitationClientService = () => {
  const getByDescription = (
    eventId: number,
    description: string
  ): Promise<InvitationViewModel> =>
    fetch(
      `${API_URLS.invitations.getByDescription()}?${new URLSearchParams({
        eventId: String(eventId),
        description,
      })}`
    ).then((response) => response.json());

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
    getByDescription,
    updateGuestsConfirmations,
  };
};
