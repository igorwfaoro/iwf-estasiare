import { getAuthUser } from '../../auth/auth-config';
import { providerConverter } from '../../converters/provider.converter';
import { prisma } from '../../data/db';
import { AlreadyExistsError } from '../../errors/types/already-exists.error';
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
            contactEmail: inputData.contactEmail,
            contactPhone: inputData.contactPhone,
            contactWhatsApp: inputData.contactWhatsApp,
            link: inputData.link,
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

    if (!authUser.provider) throw new NotFoundError('Fornecedor não existe');

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
              contactEmail: inputData.contactEmail,
              contactPhone: inputData.contactPhone,
              contactWhatsApp: inputData.contactWhatsApp,
              link: inputData.link,
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
    const normalizedSlug = normalizeSlug(slug);

    const providersCount = await prisma.provider.count({
      where: {
        slug: normalizedSlug
      }
    });

    return providersCount > 0;
  };

  return {
    create,
    update,
    slugAlreadyExists
  };
};
