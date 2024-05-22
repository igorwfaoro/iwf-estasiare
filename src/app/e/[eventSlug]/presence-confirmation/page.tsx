import { Metadata } from 'next';
import { cache } from 'react';

import ToastProvider from '../../../../contexts/ToastContext';
import { createEventServerService } from '../../../../services/server/event.server-service';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import PresenceConfirmationContent from './components/PageContent/PageContent';
import PresenceConfirmationProvider from './components/PageContent/contexts/PresenceConfirmationContext';

export const revalidate = 3600;

const getEvent = cache(async (eventSlug: string) => {
  return await createEventServerService().getByeventSlug(eventSlug);
});

export async function generateMetadata({
  params
}: {
  params: { eventSlug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: `Confirmação | ${event.titleDescription}`
  };
}

export default async function PresenceConfirmation({
  params
}: {
  params: { eventSlug: string };
}) {
  const event = await getEvent(params.eventSlug);

  return (
    <ToastProvider>
      <EventPageBase>
        <PresenceConfirmationProvider event={event}>
          <PresenceConfirmationContent />
        </PresenceConfirmationProvider>
      </EventPageBase>
    </ToastProvider>
  );
}
