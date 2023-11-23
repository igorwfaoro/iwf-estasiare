'use client';

import { useEffect, useState } from 'react';
import { createEventClientService } from '../../../client-services/event.client-service';
import './index.scss';
import { EventViewModel } from '../../../models/view-models/event.view-model';
import { useToast } from '../../../contexts/ToastContext';
import Card from '../../../components/Card';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import ScrollContainer from 'react-indiana-drag-scroll';
import EventsList from './EventsList';

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

  const searchEvents = () => {
    // TODO: search events
  };

  const eventsRaw: EventViewModel[] = Array.from({ length: 20 }).map(
    (_, i) => ({
      id: i,
      eventType: 'WEDDING',
      date: dayjs('2024-09-21T19:00:00.000Z').toDate(),
      slug: 'casamento-igor-gabi',
      address: {
        id: 1,
        shortDescription: 'La Casa Piemont - Farroupilha - RS',
        fullDescription:
          'Espaço de Eventos La Casa Piemont, 240 - Estrada VRS 826 - Linha Boêmios, Farroupilha - RS, 95181-899',
      },
      content: {
        id: 1,
        primaryColor: '#687FF9',
        logoImage:
          'https://drive.google.com/uc?export=view&id=1YkZQUFKzEd5CW6OXBRd0x46j1-tumquv',
        spotifyPlaylistUrl:
          'https://open.spotify.com/embed/playlist/4repDc6kVmb39JvP5uq4Eb?utm_source=generator',
        bannerImage: 'https://i.imgur.com/fdyNtWe.jpg',
        images: [],
      },
      weddingDetail: {
        id: 1,
        brideName: 'Gabrielle',
        groomName: 'Igor',
      },
      createdAt: dayjs('2023-11-22T19:59:52.459Z').toDate(),
      titleDescription: 'Casamento Igor & Gabrielle',
    })
  );

  return (
    <section id="events">
      <EventsList items={events} isLoading={isLoading} />
    </section>
  );
}
