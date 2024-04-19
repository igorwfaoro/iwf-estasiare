import { EventContactInfo } from '@prisma/client';

import { EventContactInfoViewModel } from '../models/view-models/event-contact-info.view-model';

export type EventContactInfoConverterModel = EventContactInfo;

export const eventContactInfoConverter = {
  modelToViewModel: (
    model: EventContactInfoConverterModel
  ): EventContactInfoViewModel => ({
    id: Number(model.id),
    description: model.description,
    phoneNumber: model.phoneNumber,
    whatsAppNumber: model.whatsAppNumber,
    email: model.email
  })
};
