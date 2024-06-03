import {
  Address,
  Provider,
  ProviderCategory,
  ProviderLink,
  ProviderProviderCategory
} from '@prisma/client';

import { ProviderViewModel } from '../models/view-models/provider.view-model';
import { appDayjs } from '../util/date';
import { getFileApiUrlOrNull } from '../util/helpers/file.helper';
import { addressConverter } from './address.converter';
import { providerCategoryConverter } from './provider-category.converter';
import { providerLinkConverter } from './provider-link.converter';
import {
  ProviderServiceAreaConverterModel,
  providerServiceAreaConverter
} from './provider-service-area.converter';

export type ProviderConverterModel = Provider & {
  providerCategories?:
    | (ProviderProviderCategory & { category: ProviderCategory })[]
    | null;
  address?: Address | null;
  links?: ProviderLink[];
  serviceAreas?: ProviderServiceAreaConverterModel[];
};

export const providerConverter = {
  modelToViewModel: (model: ProviderConverterModel): ProviderViewModel => ({
    id: Number(model.id),
    slug: model.slug,
    name: model.name,
    profileImage: getFileApiUrlOrNull(model.profileImage),
    bio: model.bio,
    address: model.address
      ? addressConverter.modelToViewModel(model.address)
      : undefined,
    primaryColor: model.primaryColor,
    createdAt: appDayjs(model.createdAt).toISOString(),
    categories: model.providerCategories?.map((pc) =>
      providerCategoryConverter.modelToViewModel(pc.category)
    ),
    links: model.links?.map(providerLinkConverter.modelToViewModel),
    serviceAreas: model.serviceAreas?.map(
      providerServiceAreaConverter.modelToViewModel
    )
  })
};
