import { providerCategoryConverter } from '../../converters/provider-category.converter';
import { prisma } from '../../data/db';
import { ProviderCategoryViewModel } from '../../models/view-models/provider-category.view-model';

export const createProviderCategoryServerService = () => {
  const getAll = async (): Promise<ProviderCategoryViewModel[]> => {
    const categories = await prisma.providerCategory.findMany();
    return categories.map(providerCategoryConverter.modelToViewModel);
  };

  return {
    getAll
  };
};
