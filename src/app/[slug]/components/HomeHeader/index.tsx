import dayjs from 'dayjs';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import { EventType } from '@prisma/client';
import { eventTypeLabel } from '../../../../util/helpers/event-type.helper';

interface HomeHeaderProps {
  event: EventViewModel;
}

export default function HomeHeader({ event }: HomeHeaderProps) {
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
          __html: `#home-header:before { background-image: url(${event.designDetail.bannerImage}) }`,
        }}
      ></style>

      <header id="home-header">
        <div className="content">
          <h2>{eventTypeText}</h2>
          <div>{titleContent}</div>
          <span className="content_sub">{dateFormatted}</span>
        </div>
      </header>
    </>
  );
}
