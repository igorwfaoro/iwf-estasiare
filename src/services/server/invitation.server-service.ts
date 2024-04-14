import dayjs from 'dayjs';
import { invitationConverter } from '../../converters/invitation.converter';
import { prisma } from '../../data/db';
import { InvitationInputModel } from '../../models/input-models/invitation.input-model';
import { UpdateGuestsConfirmationInputModel } from '../../models/input-models/update-guests-confirmation.input-model';
import { InvitationViewModel } from '../../models/view-models/invitation.view-model';
import { createEventServerService } from './event.server-service';
import { GuestInputModel } from '../../models/input-models/guest.input-model';
import { guestConverter } from '../../converters/guest.converter';

export const createInvitationServerService = () => {
  const eventService = createEventServerService();

  const getByDescription = async (
    eventId: number,
    description: string
  ): Promise<InvitationViewModel> => {
    const invitation = await prisma.invitation.findFirstOrThrow({
      where: {
        eventId,
        description: {
          equals: description,
          mode: 'insensitive'
        }
      },
      include: {
        guests: true
      }
    });

    return invitationConverter.modelToViewModel(invitation);
  };

  const getAllByEvent = async (
    eventId: number
  ): Promise<InvitationViewModel[]> => {
    await eventService.verifyUserEvent(eventId);

    const invitations = await prisma.invitation.findMany({
      where: {
        eventId
      }
    });

    return invitations.map(invitationConverter.modelToViewModel);
  };

  const getById = async (
    eventId: number,
    id: number
  ): Promise<InvitationViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const invitation = await prisma.invitation.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        guests: true
      }
    });

    return invitationConverter.modelToViewModel(invitation);
  };

  const create = async (
    eventId: number,
    input: InvitationInputModel
  ): Promise<InvitationViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const invitation = await prisma.invitation.create({
      data: {
        eventId,
        description: input.description
      }
    });

    return invitationConverter.modelToViewModel(invitation);
  };

  const update = async ({
    eventId,
    id,
    input
  }: {
    eventId: number;
    id: number;
    input: Partial<InvitationInputModel>;
  }): Promise<InvitationViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const invitation = await prisma.invitation.update({
      where: {
        eventId,
        id
      },
      data: {
        description: input.description
      }
    });

    return invitationConverter.modelToViewModel(invitation);
  };

  const remove = async (eventId: number, id: number): Promise<void> => {
    await eventService.verifyUserEvent(eventId);

    await prisma.invitation.delete({
      where: {
        eventId,
        id
      }
    });
  };

  const updateGuestsConfirmation = async (
    invitationId: number,
    input: UpdateGuestsConfirmationInputModel
  ) => {
    await prisma.$transaction([
      // set all to DECLINED
      prisma.guest.updateMany({
        where: {
          invitationId
        },
        data: {
          status: 'DECLINED'
        }
      }),

      // set to CONFIRMED
      prisma.guest.updateMany({
        where: {
          invitationId,
          id: {
            in: input.guests
              .filter((g) => g.status === 'CONFIRMED')
              .map((g) => g.id)
          }
        },
        data: {
          status: 'CONFIRMED'
        }
      })
    ]);
  };

  const addGuest = async ({
    eventId,
    invitationId,
    input
  }: {
    eventId: number;
    invitationId: number;
    input: GuestInputModel;
  }) => {
    await eventService.verifyUserEvent(eventId);

    const guest = await prisma.guest.create({
      data: {
        invitationId,
        name: input.name,
        status: input.status
      }
    });

    return guestConverter.modelToViewModel(guest);
  };

  const updateGuest = async ({
    eventId,
    invitationId,
    guestId,
    input
  }: {
    eventId: number;
    invitationId: number;
    guestId: number;
    input: Partial<GuestInputModel>;
  }) => {
    await eventService.verifyUserEvent(eventId);

    const guest = await prisma.guest.update({
      where: {
        invitation: { eventId },
        invitationId,
        id: guestId
      },
      data: {
        invitationId,
        name: input.name,
        status: input.status
      }
    });

    return guestConverter.modelToViewModel(guest);
  };

  const removeGuest = async ({
    eventId,
    invitationId,
    guestId
  }: {
    eventId: number;
    invitationId: number;
    guestId: number;
  }) => {
    await eventService.verifyUserEvent(eventId);

    await prisma.guest.delete({
      where: {
        invitation: { eventId },
        invitationId,
        id: guestId
      }
    });
  };

  return {
    getByDescription,
    getAllByEvent,
    getById,
    create,
    update,
    remove,
    updateGuestsConfirmation,
    addGuest,
    updateGuest,
    removeGuest
  };
};
