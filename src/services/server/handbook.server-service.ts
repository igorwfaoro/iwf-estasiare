import { eventHandbookConverter } from '../../converters/event-handbook.converter';
import { prisma } from '../../data/db';
import { HandbookInputModel } from '../../models/input-models/handbook.input-model';
import { EventHandbookDetailViewModel } from '../../models/view-models/event-handbook-detail.view-model';
import { EventHandbookViewModel } from '../../models/view-models/event-handbook.view-model';
import { createEventServerService } from './event.server-service';

export const createHandbookServerService = () => {
  const eventService = createEventServerService();

  const getAllByEvent = async (
    eventId: number
  ): Promise<EventHandbookViewModel[]> => {
    const handbooks = await prisma.eventHandbook.findMany({
      where: {
        eventId
      }
    });

    return handbooks.map(eventHandbookConverter.modelToViewModel);
  };

  const getById = async (id: number): Promise<EventHandbookDetailViewModel> => {
    const handbook = await prisma.eventHandbook.findUniqueOrThrow({
      where: {
        id
      }
    });

    return eventHandbookConverter.modelToDetailViewModel(handbook);
  };

  const create = async (
    eventId: number,
    input: HandbookInputModel
  ): Promise<EventHandbookDetailViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const handbook = await prisma.eventHandbook.create({
      data: {
        eventId,
        title: input.title,
        description: input.description,
        content: input.content
      }
    });

    return eventHandbookConverter.modelToDetailViewModel(handbook);
  };

  const update = async ({
    eventId,
    id,
    input
  }: {
    eventId: number;
    id: number;
    input: Partial<HandbookInputModel>;
  }): Promise<EventHandbookDetailViewModel> => {
    await eventService.verifyUserEvent(eventId);

    const handbook = await prisma.eventHandbook.update({
      where: {
        eventId,
        id
      },
      data: {
        title: input.title,
        description: input.description,
        content: input.content
      }
    });

    return eventHandbookConverter.modelToDetailViewModel(handbook);
  };

  const remove = async (eventId: number, id: number): Promise<void> => {
    await eventService.verifyUserEvent(eventId);

    await prisma.eventHandbook.delete({
      where: {
        eventId,
        id
      }
    });
  };

  return {
    getById,
    getAllByEvent,
    create,
    update,
    remove
  };
};
