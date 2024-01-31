import { cache } from 'react';
import EventCard from '../../../../components/EventCard/EventCard';
<<<<<<< Updated upstream
import AdminPageBase from '../AdminPageBase/AdminPageBase';
import { createEventService } from '../../../../app-services/event.service';
=======
import { createEventServerService } from '../../../../services/server/event.server-service';
>>>>>>> Stashed changes
import { getAuthUser } from '../../../../auth/auth-config';

const getEvents = cache(async () => {
  const user = await getAuthUser();
  return await createEventServerService().getByUser(user);
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
