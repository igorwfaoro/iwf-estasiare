import { GiftRegistry } from '@prisma/client';

import { GiftRegistryViewModel } from '../models/view-models/gift-registry.view-model';

export type GiftRegistryConverterModel = GiftRegistry & {};

export const giftRegistryConverter = {
  modelToViewModel: (
    model: GiftRegistryConverterModel
  ): GiftRegistryViewModel => ({
    id: Number(model.id),
    storeName: model.storeName,
    description: model.description,
    url: model.url
  })
};
