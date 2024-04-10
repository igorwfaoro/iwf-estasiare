import Card from '../../../../../../components/Card/Card';
import Tabs, { TabItem } from '../../../../../../components/Tabs/Tabs';
import { useAdminEventPageContext } from '../../contexts/AdminEventPageContext';
import EventGeneralTab from './tabs/EventGeneralTab/EventGeneralTab';
import GiftsTab from './tabs/GiftsTab/GiftsTab';
import GiftsTabProvider from './tabs/GiftsTab/contexts/GiftsTabContext';
import HandBooksTab from './tabs/HandbooksTab/HandbooksTab';
import HandbooksTabProvider from './tabs/HandbooksTab/contexts/HandbooksTabContext';

interface EventTabsProps {}

export default function EventTabs({}: EventTabsProps) {
  const { eventIsLoading } = useAdminEventPageContext();

  const tabs: TabItem[] = [
    {
      label: 'Evento',
      component: <EventGeneralTab />
    },
    {
      label: 'Presentes',
      component: (
        <GiftsTabProvider>
          <GiftsTab />
        </GiftsTabProvider>
      )
    },
    // {
    //   label: 'Presença',
    //   component: <PresenceConfirmationTab />
    // },
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
