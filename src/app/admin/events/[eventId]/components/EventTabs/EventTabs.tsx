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
      key: 'event',
      label: 'Evento',
      component: <EventInfoTab />
    },
    {
      key: 'gifts',
      label: 'Presentes',
      component: (
        <GiftsTabProvider>
          <GiftsTab />
        </GiftsTabProvider>
      )
    },
    {
      key: 'invitations',
      label: 'Convites',
      component: (
        <PresenceConfirmationTabProvider>
          <PresenceConfirmationTab />
        </PresenceConfirmationTabProvider>
      )
    },
    {
      key: 'handbooks',
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
