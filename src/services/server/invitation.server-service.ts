import { invitationConverter } from '../../converters/invitation.converter';
import { prisma } from '../../data/db';
import { NotFoundError } from '../../errors/types/not-found.error';
import { InvitationInputModel } from '../../models/input-models/invitation-create.input-model';
import {
  InvitationGuestUpdateInputModel,
  InvitationUpdateInputModel
} from '../../models/input-models/invitation-update.input-model';
import { UpdateGuestsConfirmationInputModel } from '../../models/input-models/update-guests-confirmation.input-model';
import { InvitationDetailViewModel } from '../../models/view-models/invitation-detail.view-model';
import { InvitationViewModel } from '../../models/view-models/invitation.view-model';
import { createEventServerService } from './event.server-service';

export const createInvitationServerService = () => {
  const eventService = createEventServerService();

  const searchByGuestName = async (
    eventId: number,
    query: string
  ): Promise<InvitationDetailViewModel[]> => {
    const invitations = await prisma.invitation.findMany({
      where: {
        eventId,
        guests: {
          some: {
            name: { equals: query, mode: 'insensitive' }
          }
        }
      },
      include: {
        guests: true
      }
    });

    return invitations.map(invitationConverter.modelToDetailViewModel);
  };

  const getAllByEvent = async (
    eventId: number
  ): Promise<InvitationViewModel[]> => {
    await eventService.verifyUserEvent(eventId);

    const invitations = await prisma.invitation.findMany({
      where: {
        eventId
      },
      include: {
        guests: true
      }
    });

    return invitations.map((invitation) =>
      invitationConverter.modelToViewModel(invitation, {
        guestsCount: invitation.guests.length,
        guestsConfirmed: invitation.guests.filter(
          (x) => x.status === 'CONFIRMED'
        ).length
      })
    );
  };

  const getById = async (
    eventId: number,
    id: number
  ): Promise<InvitationDetailViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const invitation = await prisma.invitation.findFirst({
      where: {
        id
      },
      include: {
        guests: true
      }
    });

    if (!invitation) throw new NotFoundError('Convite não encontrado');

    return invitationConverter.modelToDetailViewModel(invitation);
  };

  const create = async (
    eventId: number,
    input: InvitationInputModel
  ): Promise<InvitationDetailViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const invitation = await prisma.invitation.create({
      data: {
        eventId,
        description: input.description,
        guests: {
          createMany: {
            data: input.guests
              ? input.guests.map((g) => ({
                  name: g.name,
                  status: g.status
                }))
              : []
          }
        }
      },
      include: {
        guests: true
      }
    });

    return invitationConverter.modelToDetailViewModel(invitation);
  };

  const update = async ({
    eventId,
    id,
    input
  }: {
    eventId: number;
    id: number;
    input: InvitationUpdateInputModel;
  }): Promise<InvitationDetailViewModel> => {
    await eventService.verifyUserEvent(eventId);

    if (input.guests) {
      await updateInvitationGuests({
        eventId,
        invitationId: id,
        guests: input.guests
      });
    }

    const invitation = await prisma.invitation.update({
      where: {
        eventId,
        id
      },
      data: {
        description: input.description
      },
      include: {
        guests: true
      }
    });

    return invitationConverter.modelToDetailViewModel(invitation);
  };

  const updateInvitationGuests = async ({
    eventId,
    invitationId,
    guests
  }: {
    eventId: number;
    invitationId: number;
    guests: InvitationGuestUpdateInputModel[];
  }) => {
    if (!guests) return;

    const currentGuests = await prisma.guest.findMany({
      where: {
        invitation: { eventId },
        invitationId
      }
    });

    const guestsIdsToRemove = currentGuests
      .filter((g) => !guests.find((x) => Number(x.id) == Number(g.id)))
      .map((g) => g.id);

    const guestsToAdd = guests.filter((g) => !g.id);

    const guestsToUpdate = guests.filter((g) => !!g.id);

    await prisma.$transaction([
      prisma.guest.deleteMany({
        where: {
          invitation: { eventId },
          invitationId,
          id: { in: guestsIdsToRemove }
        }
      }),
      prisma.guest.createMany({
        data: guestsToAdd.map((g) => ({
          invitationId,
          name: g.name!,
          status: g.status
        }))
      }),
      ...guestsToUpdate.map((g) =>
        prisma.guest.update({
          where: {
            invitation: { eventId },
            invitationId,
            id: g.id
          },
          data: {
            name: g.name,
            status: g.status
          }
        })
      )
    ]);
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

  return {
    searchByGuestName,
    getAllByEvent,
    getById,
    create,
    update,
    remove,
    updateGuestsConfirmation
  };
};
