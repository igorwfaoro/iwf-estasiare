import { cache } from 'react';
import { Metadata } from 'next';
import Header from './components/Header/Header';
import HandbooksList from './components/HandbooksList/HandbooksList';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import { createEventServerService } from '../../../services/server/event.server-service';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventServerService().getBySlug(slug, { handbooks: true });
});

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: `Manuais | ${event.titleDescription}`
  };
}

export default async function Handbooks({
  params
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  return (
    <EventPageBase>
      <Header event={event} />
      <HandbooksList event={event} />
    </EventPageBase>
  );
}
