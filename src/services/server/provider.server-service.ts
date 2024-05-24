import { getAuthUser } from '../../auth/auth-config';
import { providerConverter } from '../../converters/provider.converter';
import { prisma } from '../../data/db';
import { AlreadyExistsError } from '../../errors/types/already-exists.error';
import { BadError } from '../../errors/types/bad.error';
import { NotFoundError } from '../../errors/types/not-found.error';
import { ProviderInputModel } from '../../models/input-models/provider.input-model';
import { ProviderViewModel } from '../../models/view-models/provider.view-model';
import { normalizeSlug } from '../../util/helpers/slug.helper';
import { createFileServerService } from './file.server-service';

export interface CreateUpdateProviderParams<T> {
  inputData: T;
  inputFiles: {
    profileImage: File | undefined;
  };
}

export const createProviderServerService = () => {
  const getBySlug = async (slug: string): Promise<ProviderViewModel> => {
    const provider = await prisma.provider.findFirst({
      where: { slug },
      include: {
        providerCategories: {
          include: { category: true }
        },
        address: true
      }
    });

    if (!provider) throw new BadError('Usuário não é um fornecedor');

    return providerConverter.modelToViewModel(provider);
  };

  const create = async ({
    inputData,
    inputFiles
  }: CreateUpdateProviderParams<ProviderInputModel>): Promise<ProviderViewModel> => {
    const authUser = await getAuthUser();
    const fileService = createFileServerService();

    let profileImage: string | undefined = undefined;
    if (inputFiles.profileImage) {
      profileImage = (
        await fileService.uploadFile(inputFiles.profileImage, {
          fileExt: 'png'
        })
      ).fileLocation;
    }

    const user = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        provider: {
          create: {
            slug: normalizeSlug(inputData.slug),
            name: inputData.name,
            address: {
              create: inputData.address
            },
            primaryColor: inputData.primaryColor,
            profileImage,
            bio: inputData.bio,
            ...(!!inputData.categories?.length && {
              providerCategories: {
                createMany: {
                  data: inputData.categories?.map((categoryId) => ({
                    categoryId
                  }))
                }
              }
            })
          }
        }
      },
      include: {
        provider: true
      }
    });

    return providerConverter.modelToViewModel(user.provider!);
  };

  const update = async ({
    inputData,
    inputFiles
  }: CreateUpdateProviderParams<
    Partial<ProviderInputModel>
  >): Promise<ProviderViewModel> => {
    const authUser = await getAuthUser();

    if (!authUser.provider) throw new BadError('Usuário não é um fornecedor');

    if (inputData.slug && (await slugAlreadyExists(inputData.slug)))
      throw new AlreadyExistsError('Slug já esta sendo utilizado');

    const fileService = createFileServerService();

    let profileImage: string | undefined = undefined;
    if (inputFiles.profileImage) {
      await fileService.deleteFile(authUser.provider.profileImage);

      profileImage = (
        await fileService.uploadFile(inputFiles.profileImage, {
          fileExt: 'png'
        })
      ).fileLocation;
    }

    const [_, user] = await prisma.$transaction([
      prisma.providerProviderCategory.deleteMany({
        where: { providerId: authUser.provider.id }
      }),
      prisma.user.update({
        where: { id: authUser.id },
        data: {
          provider: {
            update: {
              slug: inputData.slug
                ? normalizeSlug(inputData.slug)
                : inputData.slug,
              name: inputData.name,
              address: authUser.provider.address
                ? { update: inputData.address }
                : { create: inputData.address },
              primaryColor: inputData.primaryColor,
              profileImage,
              bio: inputData.bio,
              ...(!!inputData.categories?.length && {
                providerCategories: {
                  createMany: {
                    data: inputData.categories?.map((categoryId) => ({
                      categoryId
                    }))
                  }
                }
              })
            }
          }
        },
        include: {
          provider: true
        }
      })
    ]);

    return providerConverter.modelToViewModel(user.provider!);
  };

  const slugAlreadyExists = async (slug: string): Promise<boolean> => {
    const user = await getAuthUser();

    const normalizedSlug = normalizeSlug(slug);

    const providersCount = await prisma.provider.count({
      where: {
        AND: [{ slug: normalizedSlug }, { slug: { not: user.provider?.slug } }]
      }
    });

    return providersCount > 0;
  };

  return {
    getBySlug,
    create,
    update,
    slugAlreadyExists
  };
};
