import { Prisma } from '@prisma/client';
import { getAuthUser } from '../../auth/auth-config';
import { providerConverter } from '../../converters/provider.converter';
import { prisma } from '../../data/db';
import { AlreadyExistsError } from '../../errors/types/already-exists.error';
import { BadError } from '../../errors/types/bad.error';
import { ProviderSearchInputModel } from '../../models/input-models/provider-search.input-model';
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
        address: true,
        links: {
          where: { isActive: true },
          include: {
            type: true
          }
        },
        serviceAreas: {
          include: {
            address: true
          }
        }
      }
    });

    if (!provider) throw new BadError('Fornecedor não encontrado');

    return providerConverter.modelToViewModel(provider);
  };

  const search = async ({ limit, index, query }: ProviderSearchInputModel) => {
    const take = limit ?? 30;
    const skip = (index ?? 0) * take;
    const searchQuery = query?.toLowerCase().trim();

    const providers = await prisma.provider.findMany({
      // where: {
      //   OR: [
      //     {
      //       address: {
      //         formattedAddress: {
      //           contains: searchQuery,
      //           mode: 'insensitive'
      //         }
      //       }
      //     },
      //     {
      //       weddingDetail: {
      //         groomName: {
      //           contains: searchQuery,
      //           mode: 'insensitive'
      //         }
      //       }
      //     },
      //     {
      //       weddingDetail: {
      //         brideName: {
      //           contains: searchQuery,
      //           mode: 'insensitive'
      //         }
      //       }
      //     }
      //   ]
      // },
      include: {
        address: true,
        providerCategories: {
          include: {
            category: true
          }
        }
      },
      skip,
      take
    });

    return providers.map(providerConverter.modelToViewModel);
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

    const user = await prisma.$transaction(
      async (tx) => {
        const serviceAreasAddresses = await prisma.address.createManyAndReturn({
          data:
            inputData.serviceAreas?.map((sa) => ({
              ...sa.address,
              id: undefined
            })) || []
        });

        const user = await tx.user.update({
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
                }),
                ...(!!serviceAreasAddresses.length && {
                  serviceAreas: {
                    createMany: {
                      data: serviceAreasAddresses.map((sa) => ({
                        addressId: sa.id
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

        return user;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      }
    );

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

    const user = await prisma.$transaction(
      async (tx) => {
        const serviceAreasAddresses = await prisma.address.createManyAndReturn({
          data:
            inputData.serviceAreas?.map((sa) => ({
              ...sa.address,
              id: undefined
            })) || []
        });

        // TODO: refactor this
        const providerServiceAreasToDelete =
          await tx.providerServiceArea.findMany({
            where: { providerId: authUser.provider!.id }
          });

        await tx.providerServiceArea.deleteMany({
          where: { id: { in: providerServiceAreasToDelete.map((it) => it.id) } }
        });

        await tx.address.deleteMany({
          where: {
            id: { in: providerServiceAreasToDelete.map((it) => it.addressId) }
          }
        });

        // TODO: refactor this
        await tx.providerProviderCategory.deleteMany({
          where: { providerId: authUser.provider!.id }
        });

        const user = await tx.user.update({
          where: { id: authUser.id },
          data: {
            provider: {
              update: {
                slug: inputData.slug
                  ? normalizeSlug(inputData.slug)
                  : inputData.slug,
                name: inputData.name,
                address: authUser.provider!.address
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
                }),
                ...(!!serviceAreasAddresses.length && {
                  serviceAreas: {
                    createMany: {
                      data: serviceAreasAddresses.map((sa) => ({
                        addressId: sa.id
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

        return user;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      }
    );

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
