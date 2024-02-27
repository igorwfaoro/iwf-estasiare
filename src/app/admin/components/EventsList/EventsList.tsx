import { cache } from 'react';
import EventCard from '../../../../components/EventCard/EventCard';
import { getAuthUser } from '../../../../auth/auth-config';
import { createEventClientService } from '../../../../services/client/event.client-service';

const getEvents = cache(async () => {
  return await createEventClientService().getByUser();
});

interface EventsListProps {}

export default async function EventsList({}: EventsListProps) {
  const events = await getEvents();

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
