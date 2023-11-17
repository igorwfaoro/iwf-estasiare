import dayjs from 'dayjs';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';

interface HomeInfoProps {
  event: EventViewModel;
}

export default function HomeInfo({ event }: HomeInfoProps) {
  const dateFormatted = dayjs(event.date).format('DD/MM/YYYY');

  return (
    <section id="wedding-info">
      <span className="info-date">{dateFormatted}</span>
      <span className="info-address">{event.address}</span>
    </section>
  );
}
