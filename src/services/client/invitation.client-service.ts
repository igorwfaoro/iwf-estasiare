import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { InvitationViewModel } from '../../models/view-models/invitation.view-model';

export const createInvitationClientService = () => {
  const getByDescription = (
    eventId: number,
    description: string
  ): Promise<InvitationViewModel> =>
    http()
      .get(API_URLS.invitations.getByDescription(eventId), {
        params: {
          description
        }
      })
      .then((response) => response.data);

  const updateGuestsConfirmations = (
    eventId: number,
    invitationId: number,
    guests: { id: number; isConfirmed: boolean }[]
  ) =>
    http().patch(API_URLS.invitations.updateGuestsConfirmations(eventId), {
      invitationId,
      guests
    });

  return {
    getByDescription,
    updateGuestsConfirmations
  };
};
