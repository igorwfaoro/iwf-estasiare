import { ProviderLink, ProviderLinkType } from '@prisma/client';
import { ProviderLinkViewModel } from '../models/view-models/provider-link.view-model';
import { providerLinkTypeConverter } from './provider-link-type.converter';

export type ProviderLinkConverterModel = ProviderLink & {
  type?: ProviderLinkType;
};

export const providerLinkConverter = {
  modelToViewModel: (
    model: ProviderLinkConverterModel
  ): ProviderLinkViewModel => ({
    id: Number(model.id),
    label: model.label,
    url: model.url,
    urlKey: model.urlKey,
    index: model.index,
    isActive: model.isActive,
    type: model.type
      ? providerLinkTypeConverter.modelToViewModel(model.type)
      : undefined
  })
};
