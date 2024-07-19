import { EventType } from '@prisma/client';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import { appDayjs } from '../../../../../util/date';
import { eventTypeLabel } from '../../../../../util/helpers/event.helper';

interface EventHeaderProps {
  event: EventDetailViewModel;
}

export default function EventHeader({ event }: EventHeaderProps) {
  const dateFormatted = appDayjs(event.date).format('DD/MM/YYYY');

  const titleText = {
    [EventType.WEDDING]: [
      event.weddingDetail?.groomName,
      event.weddingDetail?.brideName
    ]
      .sort()
      .join(' & ')
  }[event.eventType];

  const eventTypeText = eventTypeLabel[event.eventType];

  return (
    <>
      {!!event.content?.bannerImage && (
        <style
          dangerouslySetInnerHTML={{
            __html: `#event-header:before { background-image: url(${event.content?.bannerImage}) }`
          }}
        ></style>
      )}

      <header
        id="event-header"
        className="w-full h-dvh before:bg-cover before:bg-center before:bg-[url(/images/banner-default.jpg)] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:brightness-50"
      >
        <div className="absolute w-full h-screen flex flex-col items-center justify-center gap-6">
          {event.content?.logoImage && (
            <img className="w-56" src={event.content.logoImage} alt="Logo" />
          )}

          <h2 className="font-bold text-neutral-50 text-2xl">
            {eventTypeText}
          </h2>
          <h1 className="font-bold text-neutral-50 text-5xl md:text-6xl text-center">
            {titleText}
          </h1>
          <span className="text-neutral-50">{dateFormatted}</span>
        </div>
      </header>
    </>
  );
}
