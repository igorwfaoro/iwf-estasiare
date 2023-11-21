import { prisma } from '../data/db';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventConverter } from '../converters/event.converter';

export const createEventService = () => {
  const getBySlug = async (
    slug: string,
    extraIncludes: { gifts?: boolean; financial?: boolean } = {}
  ): Promise<EventViewModel> => {
    const event = await prisma.event.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        address: true,
        content: {
          include: {
            images: true,
          },
        },
        weddingDetail: true,
        ...extraIncludes,
      },
    });

    return eventConverter.modelToViewModel(event);
  };

  return {
    getBySlug,
  };
};
