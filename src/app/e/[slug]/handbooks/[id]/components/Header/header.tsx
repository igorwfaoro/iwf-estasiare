import { EventDetailViewModel } from '../../../../../../../models/view-models/event-detail.view-model';
import { EventHandbookDetailViewModel } from '../../../../../../../models/view-models/event-handbook-detail.view-model';
import EventPageHeader from '../../../../components/EventPageHeader/EventPageHeader';

interface HeaderProps {
  event: EventDetailViewModel;
  handbook: EventHandbookDetailViewModel;
}

export default function Header({ event, handbook }: HeaderProps) {
  return (
    <EventPageHeader>
      <EventPageHeader.Title color={event.content?.primaryColor}>
        {handbook.title}
      </EventPageHeader.Title>
      <EventPageHeader.Sub>{handbook.description}</EventPageHeader.Sub>
    </EventPageHeader>
  );
}
