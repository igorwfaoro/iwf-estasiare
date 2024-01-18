import { cache } from 'react';
import { Metadata } from 'next';
import PresenceConfirmationContent from './components/PageContent/PageContent';
import { createEventService } from '../../../app-services/event.service';
import PresenceConfirmationProvider from './components/PageContent/contexts/PresenceConfirmationContext';
import ToastProvider from '../../../contexts/ToastContext';
import EventPage from '../components/EventPage/EventPage';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: `Confirmação | ${event.titleDescription}`
  };
}

export default async function PresenceConfirmation({
  params
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  return (
    <ToastProvider>
      <EventPage>
        <PresenceConfirmationProvider event={event}>
          <PresenceConfirmationContent />
        </PresenceConfirmationProvider>
      </EventPage>
    </ToastProvider>
  );
}
