import { cache } from 'react';
import AdminPageBase from '../../components/AdminPageBase/AdminPageBase';
import Header from './components/Header/Header';
import EventTabs from './components/EventTabs/EventTabs';
import { createEventClientService } from '../../../../services/client/event.client-service';

export const revalidate = 3600;

const getEvent = cache(async (id: number) => {
  return await createEventClientService().getById(id);
});

interface AdminEventPageProps {
  params: { eventId: number };
}

export default async function AdminEventPage({ params }: AdminEventPageProps) {
  const event = await getEvent(params.eventId);

  return (
    <AdminPageBase className="space-y-4">
      <Header event={event} />
      <EventTabs event={event} />
    </AdminPageBase>
  );
}
