import dayjs from 'dayjs';
import './index.scss';
import { EventBySlugViewModel } from '../../../../models/view-models/event-by-slug.view-model';

interface EventInfoProps {
  event: EventBySlugViewModel;
}

export default function EventInfo({ event }: EventInfoProps) {
  const dateFormatted = dayjs(event.date).format('DD/MM/YYYY');

  return (
    <section id="event-info">
      <span className="info-date">{dateFormatted}</span>
      <span className="info-address">{event.address?.shortDescription}</span>
    </section>
  );
}
