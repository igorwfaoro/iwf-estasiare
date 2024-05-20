import { giftRegistryConverter } from '../../converters/gift-registry.converter';
import { prisma } from '../../data/db';
import { GiftRegistryInputModel } from '../../models/input-models/gift-registry.input-model';
import { GiftRegistryViewModel } from '../../models/view-models/gift-registry.view-model';
import { createEventServerService } from './event.server-service';

export const createGiftRegistryServerService = () => {
  const eventService = createEventServerService();

  const getAllByEvent = async (
    eventId: number
  ): Promise<GiftRegistryViewModel[]> => {
    const giftRegistries = await prisma.eventGiftRegistry.findMany({
      where: {
        eventId
      },
      include: {
        giftRegistry: true
      }
    });

    return giftRegistries.map((it) =>
      giftRegistryConverter.modelToViewModel(it.giftRegistry)
    );
  };

  const getById = async (id: number): Promise<GiftRegistryViewModel> => {
    const giftRegistry = await prisma.giftRegistry.findUnique({
      where: {
        id
      }
    });

    if (!giftRegistry) {
      throw new Error('Gift Registry not found');
    }

    return giftRegistryConverter.modelToViewModel(giftRegistry);
  };

  const create = async (
    eventId: number,
    input: GiftRegistryInputModel
  ): Promise<GiftRegistryViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const giftRegistry = await prisma.giftRegistry.create({
      data: {
        storeName: input.storeName,
        description: input.description,
        url: input.url,
        eventsGiftRegistry: {
          create: {
            eventId
          }
        }
      }
    });

    return giftRegistryConverter.modelToViewModel(giftRegistry);
  };

  const update = async ({
    eventId,
    id,
    input
  }: {
    eventId: number;
    id: number;
    input: Partial<GiftRegistryInputModel>;
  }): Promise<GiftRegistryViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const giftRegistry = await prisma.giftRegistry.update({
      where: {
        id,
        eventsGiftRegistry: { some: { eventId } }
      },
      data: {
        storeName: input.storeName,
        description: input.description,
        url: input.url
      }
    });

    return giftRegistryConverter.modelToViewModel(giftRegistry);
  };

  const remove = async (eventId: number, id: number): Promise<void> => {
    await eventService.verifyUserEvent(eventId);

    await prisma.$transaction([
      prisma.eventGiftRegistry.deleteMany({
        where: { eventId, giftRegistryId: id }
      }),
      prisma.giftRegistry.delete({
        where: {
          id
        }
      })
    ]);
  };

  return {
    getAllByEvent,
    getById,
    create,
    update,
    remove
  };
};
