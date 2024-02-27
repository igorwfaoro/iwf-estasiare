import Card from '../../../../../../components/Card/Card';
import Tabs, { TabItem } from '../../../../../../components/Tabs/Tabs';
import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import EventInfoTab from './tabs/EventInfoTab/EventInfoTab';
import GiftsTab from './tabs/GiftsTab/GiftsTab';
import HandBooksTab from './tabs/HandBooksTab/HandBooksTab';
import PresenceConfirmationTab from './tabs/PresenceConfirmationTab/PresenceConfirmationTab';

interface EventTabsProps {
  event: EventDetailViewModel;
}

export default function EventTabs({ event }: EventTabsProps) {
  const tabs: TabItem[] = [
    {
      label: 'Evento',
      component: <EventInfoTab eventId={event.id} />
    },
    {
      label: 'Presentes',
      component: <GiftsTab />
    },
    {
      label: 'Presença',
      component: <PresenceConfirmationTab />
    },
    {
      label: 'Manuais',
      component: <HandBooksTab />
    }
  ];

  return (
    <Card className="border-t-0">
      <Tabs tabs={tabs} />
    </Card>
  );
}
