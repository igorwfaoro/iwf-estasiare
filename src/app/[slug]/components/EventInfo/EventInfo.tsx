import dayjs from 'dayjs';
import { EventDetailViewModel } from '../../../../models/view-models/event-detail.view-model';

interface EventInfoProps {
  event: EventDetailViewModel;
}

export default function EventInfo({ event }: EventInfoProps) {
  const dateFormatted = dayjs(event.date).format('DD/MM/YYYY');

  return (
    <section className="bg-[url(/images/event/home-1.jpg)] bg-cover bg-bottom flex flex-col py-24 px-[2%] items-center gap-3">
      <span className="text-xl">Reserve esta data</span>
      <span className="text-3xl font-bold">{dateFormatted}</span>
    </section>
  );
}
