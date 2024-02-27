import { cache } from 'react';
import { Metadata } from 'next';
import Header from './components/Header/Header';
import GiftsList from './components/GiftsList/GiftsList';
import ModalProvider from '../../../contexts/ModalContext';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import { createEventClientService } from '../../../services/client/event.client-service';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventClientService().getBySlug(slug, {
    gifts: true,
    financial: true
  });
});

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: `Presentes | ${event.titleDescription}`
  };
}

export default async function Gifts({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  return (
    <ModalProvider>
      <EventPageBase>
        <Header event={event} />
        <GiftsList event={event} />
      </EventPageBase>
    </ModalProvider>
  );
}
