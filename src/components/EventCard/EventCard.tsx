import { EventType } from '@prisma/client';
import Link from 'next/link';
import { RefObject } from 'react';

import { EventViewModel } from '../../models/view-models/event.view-model';
import { appDayjs } from '../../util/date';
import { eventTypeLabel } from '../../util/helpers/event-type.helper';
import Card from '../Card/Card';

interface EventCardProps {
  event: EventViewModel;
  scrollingCardItemRef?: RefObject<HTMLDivElement>;
  eventUrlPrefix?: string;
  className?: string;
  getEventKey?: (event: EventViewModel) => string | number;
}

export default function EventCard({
  event,
  scrollingCardItemRef,
  eventUrlPrefix,
  className,
  getEventKey
}: EventCardProps) {
  const eventUrl = `${eventUrlPrefix || ''}/${
    getEventKey ? getEventKey(event) : event.slug
  }`;

  const eventTitle = {
    [EventType.WEDDING]: [
      event.weddingDetail?.groomName,
      event.weddingDetail?.brideName
    ]
      .sort()
      .join(' & ')
  }[event.eventType];

  const date = appDayjs(event.date).format('DD/MM/YYYY');

  return (
    <Link href={eventUrl} className={className}>
      <Card
        className="event-card h-52 bg-cover bg-center relative flex flex-col items-end justify-end transition-all ease-in-out before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-[inherit] before:bg-gradient-to-t before:from-black before:to-60% hover:brightness-125"
        bgImageUrl={event.content?.bannerImage}
        ref={scrollingCardItemRef}
      >
        <div className="content z-10 flex flex-col items-start gap-1 w-full p-3 text-neutral-100 transition-all ease-in-out hover:text-white">
          <div className="event-title text-2xl font-bold">{eventTitle}</div>
          <div className="event-type uppercase font-bold">
            {eventTypeLabel[event.eventType]}
          </div>
          <div className="event-date">{date}</div>
        </div>
      </Card>
    </Link>
  );
}
