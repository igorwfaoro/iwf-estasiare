import { ProviderLinkType } from '@prisma/client';
import { ProviderLinkTypeViewModel } from '../models/view-models/provider-link-type.view-model';

export type ProviderLinkTypeConverterModel = ProviderLinkType & {};

export const providerLinkTypeConverter = {
  modelToViewModel: (
    model: ProviderLinkTypeConverterModel
  ): ProviderLinkTypeViewModel => ({
    id: Number(model.id),
    name: model.name,
    icon: model.icon,
    urlStructure: model.urlStructure
  })
};
