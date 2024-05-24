import {
  Address,
  Provider,
  ProviderCategory,
  ProviderProviderCategory
} from '@prisma/client';

import dayjs from 'dayjs';
import { ProviderViewModel } from '../models/view-models/provider.view-model';
import { getFileApiUrlOrNull } from '../util/helpers/file.helper';
import { addressConverter } from './address.converter';
import { providerCategoryConverter } from './provider-category.converter';

export type ProviderConverterModel = Provider & {
  providerCategories?:
    | (ProviderProviderCategory & { category: ProviderCategory })[]
    | null;
  address?: Address | null;
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
    createdAt: dayjs(model.createdAt).toISOString(),
    categories: model.providerCategories?.map((pc) =>
      providerCategoryConverter.modelToViewModel(pc.category)
    )
  })
};
