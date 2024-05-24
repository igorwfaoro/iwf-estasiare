import { providerLinkTypeConverter } from '../../converters/provider-link-type.converter';
import { prisma } from '../../data/db';
import { ProviderLinkTypeViewModel } from '../../models/view-models/provider-link-type.view-model';

export const createProviderLinkTypeServerService = () => {
  const getAll = async (): Promise<ProviderLinkTypeViewModel[]> => {
    const types = await prisma.providerLinkType.findMany();
    return types.map(providerLinkTypeConverter.modelToViewModel);
  };

  return {
    getAll
  };
};
