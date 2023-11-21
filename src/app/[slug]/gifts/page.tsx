import { cache } from 'react';
import { Metadata } from 'next';
import './page.scss';
import Header from './components/Header';
import GiftsList from './components/GiftsList';
import ModalProvider from '../../../contexts/ModalContext';
import { createEventService } from '../../../app-services/event.service';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug, {
    gifts: true,
    financial: true,
  });
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: `Presentes | ${event.titleDescription}`,
  };
}

export default async function Gifts({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  return (
    <ModalProvider>
      <div id="gifts-page">
        <Header event={event} />
        <GiftsList event={event} />
      </div>
    </ModalProvider>
  );
}
