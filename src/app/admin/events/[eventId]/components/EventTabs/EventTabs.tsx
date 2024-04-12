import Card from '../../../../../../components/Card/Card';
import Tabs, { TabItem } from '../../../../../../components/Tabs/Tabs';
import { useAdminEventPageContext } from '../../contexts/AdminEventPageContext';
import EventInfoTab from './tabs/EventInfoTab/EventInfoTab';
import GiftsTab from './tabs/GiftsTab/GiftsTab';
import GiftsTabProvider from './tabs/GiftsTab/contexts/GiftsTabContext';
import HandBooksTab from './tabs/HandbooksTab/HandbooksTab';
import HandbooksTabProvider from './tabs/HandbooksTab/contexts/HandbooksTabContext';
import PresenceConfirmationTab from './tabs/PresenceConfirmationTab/PresenceConfirmationTab';
import PresenceConfirmationTabProvider from './tabs/PresenceConfirmationTab/contexts/PresenceConfirmationTabContext';

interface EventTabsProps {}

export default function EventTabs({}: EventTabsProps) {
  const { eventIsLoading } = useAdminEventPageContext();

  const tabs: TabItem[] = [
    {
      label: 'Evento',
      component: <EventInfoTab />
    },
    {
      label: 'Presentes',
      component: (
        <GiftsTabProvider>
          <GiftsTab />
        </GiftsTabProvider>
      )
    },
    {
      label: 'Presença',
      component: (
        <PresenceConfirmationTabProvider>
          <PresenceConfirmationTab />
        </PresenceConfirmationTabProvider>
      )
    },
    {
      label: 'Manuais',
      component: (
        <HandbooksTabProvider>
          <HandBooksTab />
        </HandbooksTabProvider>
      )
    }
  ];

  return (
    <Card className="border-t-0">
      <Tabs tabs={tabs} isLoading={eventIsLoading} />
    </Card>
  );
}
