import { EventType } from '@prisma/client';
import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface DetailsCardProps {
  event: EventDetailViewModel;
}

export default function DetailsCard({ event }: DetailsCardProps) {
  const content: { [key in EventType]: JSX.Element } = {
    [EventType.WEDDING]: (
      <>
        <div>
          <span>Noivo: </span>
          <span className="font-bold">{event!.weddingDetail?.groomName}</span>
        </div>
        <div>
          <span>Noiva: </span>
          <span className="font-bold">{event!.weddingDetail?.brideName}</span>
        </div>
      </>
    )
  };

  return content[event.eventType];
}
