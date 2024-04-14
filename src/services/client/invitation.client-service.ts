import { GuestStatus } from '@prisma/client';
import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { InvitationViewModel } from '../../models/view-models/invitation.view-model';
import { GuestInputModel } from '../../models/input-models/guest.input-model';
import { InvitationInputModel } from '../../models/input-models/invitation.input-model';

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

  const getAllByEvent = (
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

  const getById = (eventId: number, id: number): Promise<InvitationViewModel> =>
    http()
      .get(API_URLS.invitations.getById(eventId, id))
      .then((response) => response.data);

  const create = (
    eventId: number,
    data: InvitationInputModel
  ): Promise<InvitationViewModel> =>
    http()
      .post(API_URLS.invitations.create(eventId), data)
      .then((response) => response.data);

  const update = (
    eventId: number,
    id: number,
    data: InvitationInputModel
  ): Promise<InvitationViewModel> =>
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

  const addGuest = (
    eventId: number,
    invitationId: number,
    data: GuestInputModel
  ): Promise<InvitationViewModel> =>
    http()
      .post(API_URLS.invitations.addGuest(eventId, invitationId), data)
      .then((response) => response.data);

  const updateGuest = (
    eventId: number,
    invitationId: number,
    guestId: number,
    data: GuestInputModel
  ): Promise<InvitationViewModel> =>
    http()
      .put(
        API_URLS.invitations.updateGuest(eventId, invitationId, guestId),
        data
      )
      .then((response) => response.data);

  const removeGuest = (
    eventId: number,
    invitationId: number,
    guestId: number
  ): Promise<InvitationViewModel> =>
    http()
      .delete(API_URLS.invitations.updateGuest(eventId, invitationId, guestId))
      .then((response) => response.data);

  return {
    getByDescription,
    getAllByEvent,
    getById,
    create,
    update,
    remove,
    updateGuestsConfirmations,
    addGuest,
    updateGuest,
    removeGuest
  };
};
