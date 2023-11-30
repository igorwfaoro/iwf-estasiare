import { EventAddress, Gift } from '@prisma/client';
import { EventAddressViewModel } from '../models/view-models/event-address.view-model';

export type EventAddressConverterModel = EventAddress & {};

export const eventAddressConverter = {
  modelToViewModel: (
    model: EventAddressConverterModel
  ): EventAddressViewModel => ({
    id: Number(model.id),
    shortDescription: model.shortDescription,
    fullDescription: model.fullDescription
  })
};
