import {
  Provider,
  ProviderCategory,
  ProviderProviderCategory
} from '@prisma/client';

import dayjs from 'dayjs';
import { ProviderViewModel } from '../models/view-models/provider.view-model';
import { getFileApiUrlOrNull } from '../util/helpers/file.helper';
import { providerCategoryConverter } from './provider-category.converter';

export type ProviderConverterModel = Provider & {
  providerCategories?:
    | (ProviderProviderCategory & { category: ProviderCategory })[]
    | null;
};

export const providerConverter = {
  modelToViewModel: (model: ProviderConverterModel): ProviderViewModel => ({
    id: Number(model.id),
    slug: model.slug,
    name: model.name,
    contactEmail: model.contactEmail,
    contactPhone: model.contactPhone,
    contactWhatsApp: model.contactWhatsApp,
    profileImage: getFileApiUrlOrNull(model.profileImage),
    bio: model.bio,
    link: model.link,
    createdAt: dayjs(model.createdAt).toISOString(),
    categories: model.providerCategories?.map((pc) =>
      providerCategoryConverter.modelToViewModel(pc.category)
    )
  })
};
