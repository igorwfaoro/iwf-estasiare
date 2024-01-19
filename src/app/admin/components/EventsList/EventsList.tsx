import { cache } from 'react';
import { createEventService } from '../../../../app-services/event.service';
import EventCard from '../../../../components/EventCard/EventCard';

export const revalidate = 3600;

const getEvents = cache(async () => {
  return await createEventService().getByUser();
});

interface EventsListProps {}

export default async function EventsList({}: EventsListProps) {
  const events = await getEvents();

  return (
    <div>
      <h1>Meus Eventos</h1>

      {events.map((event, i) => (
        <EventCard key={i} event={event} eventUrlPrefix="/admin" />
      ))}
    </div>
  );
}
