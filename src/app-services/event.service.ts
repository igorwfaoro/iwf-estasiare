import { prisma } from '../data/db';
import { Event } from '@prisma/client';
import { EventViewModel } from '../models/view-models/event.view-model';

export const createEventService = () => {
  const getBySlug = async (slug: string): Promise<EventViewModel> => {
    const event = await prisma.event.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        financialDetail: true,
        designDetail: true,
        weddingDetail: true,
      },
    });

    return event;
  };

  return {
    getBySlug,
  };
};
