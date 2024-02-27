import { cache } from 'react';
import AdminPageBase from '../../components/AdminPageBase/AdminPageBase';
import { createEventServerService } from '../../../../services/server/event.server-service';
import Header from './components/Header/Header';
import EventTabs from './components/EventTabs/EventTabs';

export const revalidate = 3600;

const getEvent = cache(async (id: number) => {
  return await createEventServerService().getById(id);
});

interface AdminEventPageProps {
  params: { eventId: number };
}

export default async function AdminEventPage({ params }: AdminEventPageProps) {
  const event = await getEvent(params.eventId);

  return (
    <AdminPageBase className='space-y-4'>
      <Header event={event} />
      <EventTabs event={event} />
    </AdminPageBase>
  );
}
