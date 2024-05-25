import { getAuthUser } from '../../auth/auth-config';
import { providerLinkConverter } from '../../converters/provider-link.converter';
import { prisma } from '../../data/db';
import { BadError } from '../../errors/types/bad.error';
import { NotFoundError } from '../../errors/types/not-found.error';
import { ProviderLinkCreateInputModel } from '../../models/input-models/provider-link-create.input';
import { ProviderLinkReorderInputModel } from '../../models/input-models/provider-link-reorder.input';
import { ProviderLinkUpdateInputModel } from '../../models/input-models/provider-link-update.input';
import { ProviderLinkViewModel } from '../../models/view-models/provider-link.view-model';

const PROVIDER_LINK_URL_KEY = '{{urlKey}}';

export const createProviderLinkServerService = () => {
  const getAllByProvider = async (): Promise<ProviderLinkViewModel[]> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    const links = await prisma.providerLink.findMany({
      where: {
        providerId: user.provider.id
      },
      include: {
        type: true
      }
    });

    return links.map(providerLinkConverter.modelToViewModel);
  };

  const defineUrl = async (typeId: number, urlOrUrlKey: string) => {
    let url: string = '';
    let urlKey: string = '';

    if (typeId) {
      const type = await prisma.providerLinkType.findFirst({
        where: { id: typeId }
      });

      if (!type) throw new NotFoundError('Tipo de link não encontrado');

      url = type.urlStructure
        ? type.urlStructure.replace(PROVIDER_LINK_URL_KEY, urlOrUrlKey)
        : urlOrUrlKey;

      if (type.urlStructure) urlKey = urlOrUrlKey;
    }

    return { url, urlKey };
  };

  const create = async (
    input: ProviderLinkCreateInputModel
  ): Promise<ProviderLinkViewModel> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    const links = await prisma.providerLink.findMany({
      where: { providerId: user.provider.id }
    });

    const nextIndex = links.length
      ? links.map((it) => it.index).sort((a, b) => b - a)[0] + 1
      : 0;

    const { url, urlKey } = await defineUrl(input.typeId, input.urlOrUrlKey);

    const link = await prisma.providerLink.create({
      data: {
        providerId: user.provider.id,
        label: input.label,
        url: url,
        urlKey: urlKey,
        index: nextIndex,
        typeId: input.typeId
      },
      include: {
        type: true
      }
    });

    return providerLinkConverter.modelToViewModel(link);
  };

  const update = async (
    id: number,
    input: Partial<ProviderLinkUpdateInputModel>
  ): Promise<ProviderLinkViewModel> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    const link = await prisma.providerLink.findFirst({
      where: {
        providerId: user.provider.id,
        id
      },
      include: {
        type: true
      }
    });

    if (!link) throw new NotFoundError('Link não encontrado');

    let url: string | undefined = undefined;
    let urlKey: string | undefined = undefined;
    if (input.typeId || input.urlOrUrlKey) {
      const result = await defineUrl(
        input.typeId || Number(link.typeId),
        input.urlOrUrlKey || link.urlKey || link.url
      );
      
      url = result.url;
      urlKey = result.urlKey;
    }

    const newLink = await prisma.providerLink.update({
      where: {
        providerId: user.provider.id,
        id
      },
      data: {
        providerId: user.provider.id,
        label: input.label,
        url: url,
        urlKey: urlKey,
        index: input.index,
        typeId: input.typeId,
        isActive: input.isActive
      },
      include: {
        type: true
      }
    });

    return providerLinkConverter.modelToViewModel(newLink);
  };

  const reorder = async (
    input: ProviderLinkReorderInputModel
  ): Promise<ProviderLinkViewModel[]> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    await prisma.$transaction(
      input.map(({ id, index }) =>
        prisma.providerLink.update({
          where: { id },
          data: { index }
        })
      )
    );

    return getAllByProvider();
  };

  const remove = async (id: number): Promise<void> => {
    const user = await getAuthUser();

    if (!user.provider) throw new BadError('Usuário não é um fornecedor');

    await prisma.providerLink.delete({
      where: {
        providerId: user.provider.id,
        id
      }
    });
  };

  return {
    getAllByProvider,
    create,
    update,
    reorder,
    remove
  };
};
