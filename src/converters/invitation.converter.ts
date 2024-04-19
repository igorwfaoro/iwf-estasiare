import { Guest, Invitation } from '@prisma/client';

import { InvitationDetailViewModel } from '../models/view-models/invitation-detail.view-model';
import { InvitationViewModel } from '../models/view-models/invitation.view-model';
import { guestConverter } from './guest.converter';

export type InvitationConverterModel = Invitation;
export type InvitationConverterDetailModel = Invitation & { guests: Guest[] };

export const invitationConverter = {
  modelToViewModel: (
    model: InvitationConverterModel,
    {
      guestsCount,
      guestsConfirmed
    }: { guestsCount?: number; guestsConfirmed?: number } = {}
  ): InvitationViewModel => ({
    id: Number(model.id),
    description: model.description,
    guestsCount,
    guestsConfirmed
  }),
  modelToDetailViewModel: (
    model: InvitationConverterDetailModel
  ): InvitationDetailViewModel => ({
    id: Number(model.id),
    description: model.description,
    guests: model.guests?.map(guestConverter.modelToViewModel)
  })
};
