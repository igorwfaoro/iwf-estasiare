import { Address } from '@prisma/client';

import { AddressViewModel } from '../models/view-models/address.view-model';

export type AddressConverterModel = Address & {};

export const addressConverter = {
  modelToViewModel: (model: AddressConverterModel): AddressViewModel => ({
    id: Number(model.id),
    formattedAddress: model.formattedAddress,
    street: model.street,
    number: model.number,
    zipCode: model.zipCode,
    neighborhood: model.neighborhood,
    city: model.city,
    state: model.state,
    country: model.country,
    latitude: Number(model.latitude),
    longitude: Number(model.longitude)
  })
};
