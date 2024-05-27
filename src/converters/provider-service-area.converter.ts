import { Address, ProviderServiceArea } from '@prisma/client';
import { ProviderServiceAreaViewModel } from '../models/view-models/provider-service-area.view-model';
import { addressConverter } from './address.converter';

export type ProviderServiceAreaConverterModel = ProviderServiceArea & {
  address: Address;
};

export const providerServiceAreaConverter = {
  modelToViewModel: (
    model: ProviderServiceAreaConverterModel
  ): ProviderServiceAreaViewModel => ({
    id: Number(model.id),
    address: model.address
      ? addressConverter.modelToViewModel(model.address)
      : undefined
  })
};
