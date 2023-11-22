import { prisma } from '../data/db';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventConverter } from '../converters/event.converter';
import { SearchEventsInputModel } from '../models/input-models/search-events.input-model';

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

  const search = async ({
    query,
    index,
    limit,
  }: SearchEventsInputModel): Promise<EventViewModel[]> => {
    const take = limit ?? 30;
    const skip = (index ?? 0) * take;
    const searchQuery = query?.toLowerCase().trim();

    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            address: {
              fullDescription: { contains: searchQuery, mode: 'insensitive' },
            },
          },
          {
            weddingDetail: {
              groomName: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          },
          {
            weddingDetail: {
              brideName: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        address: true,
        content: true,
        weddingDetail: true,
      },
      skip,
      take,
    });

    events[0].address;

    return events.map(eventConverter.modelToViewModel);
  };

  const recommended = async (limit: number = 10): Promise<EventViewModel[]> => {
    const events = await prisma.event.findMany({
      include: {
        address: true,
        content: true,
        weddingDetail: true,
      },
      take: limit,
    });

    return events.map(eventConverter.modelToViewModel);
  };

  return {
    getBySlug,
    search,
    recommended,
  };
};
