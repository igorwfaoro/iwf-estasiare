import { prisma } from '../data/db';
import { EventDetailViewModel } from '../models/view-models/event-detail.view-model';
import { eventConverter } from '../converters/event.converter';
import { SearchEventsInputModel } from '../models/input-models/search-events.input-model';
import { EventViewModel } from '../models/view-models/event.view-model';
import { getServerSession } from 'next-auth';

interface ExtraIncludes {
  gifts?: boolean;
  financial?: boolean;
  handbooks?: boolean;
}

export const createEventService = () => {
  const getBySlug = async (
    slug: string,
    extraIncludes: ExtraIncludes = {}
  ): Promise<EventDetailViewModel> => {
    const giftsCount = await prisma.gift.count({
      where: {
        event: {
          slug
        }
      }
    });

    const invitationsCount = await prisma.invitation.count({
      where: {
        event: {
          slug
        }
      }
    });

    const handbooksCount = await prisma.eventHandbook.count({
      where: {
        event: {
          slug
        }
      }
    });

    const event = await prisma.event.findFirstOrThrow({
      where: {
        slug
      },
      include: {
        address: true,
        content: {
          include: {
            images: true
          }
        },
        weddingDetail: true,
        handbooks: extraIncludes.handbooks
          ? {
              select: {
                id: true,
                title: true,
                description: true
              }
            }
          : false,
        ...extraIncludes
      }
    });

    return eventConverter.modelDetailViewModel(event, {
      hasGifts: !!giftsCount,
      hasInvitations: !!invitationsCount,
      hasHandbooks: !!handbooksCount
    });
  };

  const search = async ({
    query,
    index,
    limit
  }: SearchEventsInputModel): Promise<EventViewModel[]> => {
    const take = limit ?? 30;
    const skip = (index ?? 0) * take;
    const searchQuery = query?.toLowerCase().trim();

    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            address: {
              fullDescription: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          },
          {
            weddingDetail: {
              groomName: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          },
          {
            weddingDetail: {
              brideName: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      include: {
        address: true,
        content: true,
        weddingDetail: true
      },
      skip,
      take
    });

    events[0].address;

    return events.map(eventConverter.modelViewModel);
  };

  const recommended = async (limit: number = 10): Promise<EventViewModel[]> => {
    const events = await prisma.event.findMany({
      include: {
        address: true,
        content: true,
        weddingDetail: true
      },
      take: limit
    });

    return events.map(eventConverter.modelViewModel);
  };

  const getByUser = async (): Promise<EventViewModel[]> => {
    const session = await getServerSession();

    console.log({session})

    return [];
  };

  return {
    getBySlug,
    search,
    recommended,
    getByUser
  };
};
