import { giftConverter } from '../../converters/gift.converter';
import { prisma } from '../../data/db';
import { BadError } from '../../errors/types/bad.error';
import { NotFoundError } from '../../errors/types/not-found.error';
import { GiftViewModel } from '../../models/view-models/gift.view-model';
import { createEventServerService } from './event.server-service';
import { createFileServerService } from './file.server-service';

export interface CreateUpdateGiftParams<T> {
  inputData: T;
  inputFiles: {
    fileImage: File | undefined;
  };
}

export const createGiftServerService = () => {
  const eventService = createEventServerService();

  const getAllByEvent = async (eventId: number): Promise<GiftViewModel[]> => {
    const gifts = await prisma.gift.findMany({
      where: {
        eventId
      }
    });

    return gifts.map(giftConverter.modelToViewModel);
  };

  const getById = async (id: number): Promise<GiftViewModel> => {
    const gift = await prisma.gift.findUnique({
      where: {
        id
      }
    });

    if (!gift) {
      throw new NotFoundError('Presente não encontrado');
    }

    return giftConverter.modelToViewModel(gift);
  };

  const create = async (
    eventId: number,
    { inputData, inputFiles }: CreateUpdateGiftParams<GiftInputModel>
  ): Promise<GiftViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const fileService = createFileServerService();

    if (!inputFiles.fileImage) throw new BadError('A imagem é obrigatória');

    const image = (
      await fileService.uploadFile(inputFiles.fileImage, {
        fileExt: 'png'
      })
    ).fileLocation;

    const gift = await prisma.gift.create({
      data: {
        eventId,
        description: inputData.description,
        price: inputData.price,
        image
      }
    });

    return giftConverter.modelToViewModel(gift);
  };

  const update = async ({
    eventId,
    id,
    inputParams: { inputData, inputFiles }
  }: {
    eventId: number;
    id: number;
    inputParams: CreateUpdateGiftParams<Partial<GiftInputModel>>;
  }): Promise<GiftViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const fileService = createFileServerService();

    let image: string | undefined = undefined;
    if (inputFiles.fileImage)
      image = (
        await fileService.uploadFile(inputFiles.fileImage, {
          fileExt: 'png'
        })
      ).fileLocation;

    const gift = await prisma.gift.update({
      where: {
        eventId,
        id
      },
      data: {
        description: inputData.description,
        price: inputData.price,
        image
      }
    });

    return giftConverter.modelToViewModel(gift);
  };

  const remove = async (eventId: number, id: number): Promise<void> => {
    await eventService.verifyUserEvent(eventId);

    await prisma.gift.delete({
      where: {
        eventId,
        id
      }
    });
  };

  return {
    getAllByEvent,
    getById,
    create,
    update,
    remove
  };
};
