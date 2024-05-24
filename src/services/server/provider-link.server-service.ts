import { getAuthUser } from '../../auth/auth-config';
import { providerLinkConverter } from '../../converters/provider-link.converter';
import { prisma } from '../../data/db';
import { BadError } from '../../errors/types/bad.error';
import { ProviderLinkInputModel } from '../../models/input-models/provider-link.input';
import { ProviderLinkViewModel } from '../../models/view-models/provider-link.view-model';

export const createProviderLinkServerService = () => {
  const getAllByProvider = async (
    providerId: number
  ): Promise<ProviderLinkViewModel[]> => {
    const links = await prisma.providerLink.findMany({
      where: {
        providerId
      },
      include: {
        type: true
      }
    });

    return links.map(providerLinkConverter.modelToViewModel);
  };

  const create = async (
    input: ProviderLinkInputModel
  ): Promise<ProviderLinkViewModel> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    const link = await prisma.providerLink.create({
      data: {
        providerId: user.provider.id,
        label: input.label,
        url: input.url,
        urlKey: input.urlKey,
        typeId: input.typeId
      },
      include: {
        type: true
      }
    });

    return providerLinkConverter.modelToViewModel(link);
  };

  const update = async ({
    providerId,
    id,
    input
  }: {
    providerId: number;
    id: number;
    input: Partial<ProviderLinkInputModel>;
  }): Promise<ProviderLinkViewModel> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    const link = await prisma.providerLink.update({
      where: {
        providerId: user.provider.id,
        id
      },
      data: {
        providerId: user.provider.id,
        label: input.label,
        url: input.url,
        urlKey: input.urlKey,
        typeId: input.typeId
      },
      include: {
        type: true
      }
    });

    return providerLinkConverter.modelToViewModel(link);
  };

  const remove = async (providerId: number, id: number): Promise<void> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    await prisma.providerLink.delete({
      where: {
        providerId,
        id
      }
    });
  };

  return {
    getAllByProvider,
    create,
    update,
    remove
  };
};
