import { GuestStatus } from '@prisma/client';
import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { InvitationViewModel } from '../../models/view-models/invitation.view-model';
import { InvitationInputModel } from '../../models/input-models/invitation-create.input-model';
import { InvitationDetailViewModel } from '../../models/view-models/invitation-detail.view-model';

export const createInvitationClientService = () => {
  const searchByGuestName = (
    eventId: number,
    query: string
  ): Promise<InvitationDetailViewModel[]> =>
    http()
      .get(API_URLS.invitations.searchByGuestName(eventId), {
        params: {
          description: query
        }
      })
      .then((response) => response.data);

  const getAllByEvent = (eventId: number): Promise<InvitationViewModel[]> =>
    http()
      .get(API_URLS.invitations.getAllByEvent(eventId))
      .then((response) => response.data);

  const getById = (eventId: number, id: number): Promise<InvitationDetailViewModel> =>
    http()
      .get(API_URLS.invitations.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    data: InvitationInputModel
  ): Promise<InvitationDetailViewModel> =>
    http()
      .post(API_URLS.invitations.create(eventId), data)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    data: InvitationInputModel
  ): Promise<InvitationDetailViewModel> =>
    http()
      .put(API_URLS.invitations.update(eventId, id), data)
      .then((response) => response.data);

  const remove = (eventId: number, id: number): Promise<void> =>
    http()
      .delete(API_URLS.invitations.delete(eventId, id))
      .then((response) => response.data);

  const updateGuestsConfirmations = (
    eventId: number,
    invitationId: number,
    guests: { id: number; status: GuestStatus }[]
  ) =>
    http().patch(
      API_URLS.invitations.updateGuestsConfirmations(eventId, invitationId),
      {
        invitationId,
        guests
      }
    );

  return {
    searchByGuestName,
    getAllByEvent,
    getById,
    create,
    update,
    remove,
    updateGuestsConfirmations
  };
};
