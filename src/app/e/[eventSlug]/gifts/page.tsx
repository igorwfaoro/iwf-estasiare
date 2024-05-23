import { Metadata } from 'next';
import { cache } from 'react';

import ModalProvider from '../../../../contexts/ModalContext';
import { createEventServerService } from '../../../../services/server/event.server-service';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import GiftRegistries from './components/GiftRegistries/GiftRegistries';
import GiftsList from './components/GiftsList/GiftsList';
import Header from './components/Header/Header';

export const revalidate = 3600;

const getEvent = cache(async (eventSlug: string) => {
  return await createEventServerService().getBySlug(eventSlug, {
    gifts: true,
    financial: true,
    giftRegistries: true
  });
});

export async function generateMetadata({
  params
}: {
  params: { eventSlug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: `Presentes | ${event.titleDescription}`
  };
}

export default async function Gifts({ params }: { params: { eventSlug: string } }) {
  const event = await getEvent(params.eventSlug);

  return (
    <ModalProvider>
      <EventPageBase className="space-y-6">
        <Header event={event} />
        <GiftRegistries event={event} />
        <GiftsList event={event} />
      </EventPageBase>
    </ModalProvider>
  );
}
