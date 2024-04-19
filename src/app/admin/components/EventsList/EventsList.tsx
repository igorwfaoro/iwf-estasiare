import { redirect } from 'next/navigation';
import { cache } from 'react';

import EventCard from '../../../../components/EventCard/EventCard';
import { createEventServerService } from '../../../../services/server/event.server-service';

const getEvents = cache(async () => {
  return await createEventServerService().getByUser();
});

interface EventsListProps {}

export default async function EventsList({}: EventsListProps) {
  const events = await getEvents();

  if (!events.length) redirect('/admin/new-event');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {events.map((event, i) => (
        <EventCard
          key={i}
          event={event}
          eventUrlPrefix="/admin/events"
          getEventKey={(e) => e.id}
        />
      ))}
    </div>
  );
}
