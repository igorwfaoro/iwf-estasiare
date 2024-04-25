import { ProviderCategory } from '@prisma/client';

import { ProviderCategoryViewModel } from '../models/view-models/provider-category.view-model';

export type ProviderCategoryConverterModel = ProviderCategory & {};

export const providerCategoryConverter = {
  modelToViewModel: (
    model: ProviderCategoryConverterModel
  ): ProviderCategoryViewModel => ({
    id: Number(model.id),
    description: model.description,
    isOther: model.isOther
  })
};
