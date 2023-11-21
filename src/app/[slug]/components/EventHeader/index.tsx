import dayjs from 'dayjs';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import { EventType } from '@prisma/client';
import { eventTypeLabel } from '../../../../util/helpers/event-type.helper';

interface EventHeaderProps {
  event: EventViewModel;
}

export default function EventHeader({ event }: EventHeaderProps) {
  const dateFormatted = dayjs(event.date).format('DD/MM/YYYY');

  const titleContent = {
    [EventType.WEDDING]: (
      <h1>
        {event.weddingDetail?.groomName} & {event.weddingDetail?.brideName}
      </h1>
    ),
  }[event.eventType];

  const eventTypeText = eventTypeLabel[event.eventType];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `#event-header:before { background-image: url(${event.content.bannerImage}) }`,
        }}
      ></style>

      <header id="event-header">
        <div className="content">
          {event.content.logoImage && (
            <img
              className="content_logo"
              src={event.content.logoImage}
              alt="Logo"
            />
          )}
          
          <h2>{eventTypeText}</h2>
          <div>{titleContent}</div>
          <span className="content_sub">{dateFormatted}</span>
        </div>
      </header>
    </>
  );
}
