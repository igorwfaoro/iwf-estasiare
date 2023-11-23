import { prisma } from '../data/db';
import { EventBySlugViewModel } from '../models/view-models/event-by-slug.view-model';
import { eventConverter } from '../converters/event.converter';
import { SearchEventsInputModel } from '../models/input-models/search-events.input-model';
import { EventViewModel } from '../models/view-models/event.view-model';

export const createEventService = () => {
  const getBySlug = async (
    slug: string,
    extraIncludes: { gifts?: boolean; financial?: boolean } = {}
  ): Promise<EventBySlugViewModel> => {
    const giftsCount = await prisma.gift.count({
      where: {
        event: {
          slug,
        },
      },
    });

    const invitationsCount = await prisma.invitation.count({
      where: {
        event: {
          slug,
        },
      },
    });

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

    return eventConverter.modelToSlugViewModel(event, {
      hasGifts: !!giftsCount,
      hasInvitations: !!invitationsCount,
    });
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

    return events.map(eventConverter.modelViewModel);
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

    return events.map(eventConverter.modelViewModel);
  };

  return {
    getBySlug,
    search,
    recommended,
  };
};
