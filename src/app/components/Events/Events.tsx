'use client';

import { useEffect, useState } from 'react';

import { useToast } from '../../../contexts/ToastContext';
import { EventViewModel } from '../../../models/view-models/event.view-model';
import { createEventClientService } from '../../../services/client/event.client-service';
import EventsList from './EventsList/EventsList';

interface EventsProps {}

export default function Events({}: EventsProps) {
  const eventClientService = createEventClientService();
  const toast = useToast();

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecommended();
  }, []);

  const [events, setEvents] = useState<EventViewModel[]>([]);

  const getRecommended = () => {
    setIsLoading(true);
    eventClientService
      .recommended(10)
      .then((response) => setEvents(response))
      .finally(() => {
        setIsFirstLoading(false);
        setIsLoading(false);
      });
  };

  return (
    <section id="events">
      <EventsList items={events} isLoading={isLoading} />
    </section>
  );
}
