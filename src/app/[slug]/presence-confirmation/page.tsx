import { cache } from 'react';
import { Metadata } from 'next';
import './page.scss';
import PresenceConfirmationContent from './components/PageContent';
import { createEventService } from '../../../app-services/event.service';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

export async function generateMetadata(params: {
  slug: string;
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: `Confirmação de presença - ${event.titleDescription}`,
  };
}

export default async function PresenceConfirmation() {
  return <PresenceConfirmationContent />;
}
