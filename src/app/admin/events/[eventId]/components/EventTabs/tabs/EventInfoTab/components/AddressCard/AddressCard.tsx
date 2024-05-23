import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface AddressCardProps {
  event: EventDetailViewModel;
}

export default function AddressCard({ event }: AddressCardProps) {
  return <div>{event.address?.formattedAddress}</div>;
}
