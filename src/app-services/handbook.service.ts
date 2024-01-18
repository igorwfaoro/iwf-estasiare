import { eventHandbookConverter } from '../converters/event-handbook.converter';
import { prisma } from '../data/db';
import { EventHandbookDetailViewModel } from '../models/view-models/event-handbook-detail.view-model';

export const createHandbookService = () => {
  const getById = async (id: number): Promise<EventHandbookDetailViewModel> => {
    const handbook = await prisma.eventHandbook.findUniqueOrThrow({
      where: {
        id
      }
    });

    return eventHandbookConverter.modelToDetailViewModel(handbook);
  };

  return {
    getById
  };
};
