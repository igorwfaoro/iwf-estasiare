import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';
import { appDayjs } from '../../../../../../../../../../util/date';
import { eventTypeLabel } from '../../../../../../../../../../util/helpers/event.helper';

interface GeneralCardProps {
  event: EventDetailViewModel;
}

export default function GeneralCard({ event }: GeneralCardProps) {
  const dateFormatted = appDayjs.utc(event.date).format('DD/MM/YYYY HH:mm');

  return (
    <>
      <div>
        <span>Tipo de evento: </span>
        <span className="font-bold">{eventTypeLabel[event.eventType]}</span>
      </div>
      <div>
        <span>Quando: </span>
        <span className="font-bold">{dateFormatted}</span>
      </div>
    </>
  );
}
