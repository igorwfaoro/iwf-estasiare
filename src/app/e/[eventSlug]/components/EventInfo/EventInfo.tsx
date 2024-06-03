import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import { appDayjs } from '../../../../../util/date';

interface EventInfoProps {
  event: EventDetailViewModel;
}

export default function EventInfo({ event }: EventInfoProps) {
  const dateFormatted = appDayjs(event.date).format('DD/MM/YYYY');
  const timeFormatted = appDayjs.utc(event.date).format('HH:mm');

  return (
    <section className="bg-[url(/images/event/home-1.jpg)] bg-cover bg-bottom flex flex-col py-24 px-[2%] items-center gap-3">
      <span className="text-xl">Reserve esta data</span>
      <span className="text-3xl font-bold">{dateFormatted}</span>
      <span className="text-2xl font-bold">{timeFormatted}</span>
    </section>
  );
}
