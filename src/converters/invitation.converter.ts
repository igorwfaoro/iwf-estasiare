import { Guest, Invitation } from '@prisma/client';
import { InvitationViewModel } from '../models/view-models/invitation.view-model';
import { guestConverter } from './guest.converter';

export type InvitationConverterModel = Invitation & { guests?: Guest[] };

export const invitationConverter = {
  modelToViewModel: (model: InvitationConverterModel): InvitationViewModel => ({
    id: Number(model.id),
    description: model.description,
    guests: model.guests
      ? model.guests?.map(guestConverter.modelToViewModel)
      : undefined,
  }),
};
