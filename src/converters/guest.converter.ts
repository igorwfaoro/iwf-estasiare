import { Guest, Invitation } from '@prisma/client';
import { GuestViewModel } from '../models/view-models/guest.view-model';
import { invitationConverter } from './invitation.converter';

export type GuestConverterModel = Guest & { invitation?: Invitation };

export const guestConverter = {
  modelToViewModel: (model: GuestConverterModel): GuestViewModel => ({
    id: Number(model.id),
    name: model.name,
    isConfirmed: model.isConfirmed,
    confirmationDate: model.confirmationDate,
    invitation: model.invitation
      ? invitationConverter.modelToViewModel(model.invitation)
      : undefined
  })
};
