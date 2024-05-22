import { Metadata } from 'next';
import { cache } from 'react';

import { createEventServerService } from '../../../services/server/event.server-service';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import HandbooksList from './components/HandbooksList/HandbooksList';
import Header from './components/Header/Header';

export const revalidate = 3600;

const getEvent = cache(async (eventSlug: string) => {
  return await createEventServerService().getByeventSlug(eventSlug, { handbooks: true });
});

export async function generateMetadata({
  params
}: {
  params: { eventSlug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: `Manuais | ${event.titleDescription}`
  };
}

export default async function Handbooks({
  params
}: {
  params: { eventSlug: string };
}) {
  const event = await getEvent(params.eventSlug);

  return (
    <EventPageBase>
      <Header event={event} />
      <HandbooksList event={event} />
    </EventPageBase>
  );
}
