import { Guest, Invitation } from '@prisma/client';
import { InvitationViewModel } from '../models/view-models/invitation.view-model';
import { guestConverter } from './guest.converter';
import { InvitationDetailViewModel } from '../models/view-models/invitation-detail.view-model';

export type InvitationConverterModel = Invitation;
export type InvitationConverterDetailModel = Invitation & { guests: Guest[] };

export const invitationConverter = {
  modelToViewModel: (model: InvitationConverterModel): InvitationViewModel => ({
    id: Number(model.id),
    description: model.description
  }),
  modelToDetailViewModel: (
    model: InvitationConverterDetailModel
  ): InvitationDetailViewModel => ({
    id: Number(model.id),
    description: model.description,
    guests: model.guests?.map(guestConverter.modelToViewModel)
  })
};
