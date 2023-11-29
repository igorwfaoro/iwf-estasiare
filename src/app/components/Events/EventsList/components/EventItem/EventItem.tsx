import Link from 'next/link';
import Card from '../../../../../../components/Card/Card';
import { EventViewModel } from '../../../../../../models/view-models/event.view-model';
import { RefObject } from 'react';
import { EventType } from '@prisma/client';
import { eventTypeLabel } from '../../../../../../util/helpers/event-type.helper';
import dayjs from 'dayjs';

interface EventItemProps {
    item: EventViewModel;
    scrollingCardItemRef: RefObject<HTMLDivElement>;
}

export default function EventItem({
    item,
    scrollingCardItemRef
}: EventItemProps) {
    const eventUrl = `/${item.slug}`;

    const eventTitle = {
        [EventType.WEDDING]: [
            item.weddingDetail?.groomName,
            item.weddingDetail?.brideName
        ]
            .sort()
            .join(' & ')
    }[item.eventType];

    const date = dayjs(item.date).format('DD/MM/YYYY');

    return (
        <Link
            href={eventUrl}
            className="min-w-[60%] max-w-[60%] md:min-w-[25%] md:max-w-[25%]"
        >
            <Card
                className="event-card h-52 bg-cover bg-center relative flex flex-col items-end justify-end transition-all ease-in-out before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-[inherit] before:bg-gradient-to-t before:from-black before:to-60% hover:brightness-125"
                bgImageUrl={item.content?.bannerImage}
                elementRef={scrollingCardItemRef}
            >
                <div className="content z-10 flex flex-col items-start gap-1 w-full p-3 text-neutral-100 transition-all ease-in-out hover:text-white">
                    <div className="event-title text-2xl font-bold">
                        {eventTitle}
                    </div>
                    <div className="event-type uppercase font-bold">
                        {eventTypeLabel[item.eventType]}
                    </div>
                    <div className="event-date">{date}</div>
                </div>
            </Card>
        </Link>
    );
}
