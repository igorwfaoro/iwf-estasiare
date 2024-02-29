import Card from '../../../../../../components/Card/Card';
import Tabs, { TabItem } from '../../../../../../components/Tabs/Tabs';
import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import EventInfoTab from './tabs/EventInfoTab/EventInfoTab';
import GiftsTab from './tabs/GiftsTab/GiftsTab';
import GiftsTabProvider from './tabs/GiftsTab/contexts/GiftsTabContext';
import HandBooksTab from './tabs/HandbooksTab/HandbooksTab';
import HandbooksTabProvider from './tabs/HandbooksTab/contexts/HandbooksTabContext';
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
      component: (
        <GiftsTabProvider eventId={event.id}>
          <GiftsTab />
        </GiftsTabProvider>
      )
    },
    {
      label: 'Presença',
      component: <PresenceConfirmationTab />
    },
    {
      label: 'Manuais',
      component: (
        <HandbooksTabProvider eventId={event.id}>
          <HandBooksTab />
        </HandbooksTabProvider>
      )
    }
  ];

  return (
    <Card className="border-t-0">
      <Tabs tabs={tabs} />
    </Card>
  );
}
