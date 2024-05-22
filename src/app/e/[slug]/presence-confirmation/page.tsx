import { Metadata } from 'next';
import { cache } from 'react';

import ToastProvider from '../../../../contexts/ToastContext';
import { createEventServerService } from '../../../../services/server/event.server-service';
import EventPageBase from '../components/EventPageBase/EventPageBase';
import PresenceConfirmationContent from './components/PageContent/PageContent';
import PresenceConfirmationProvider from './components/PageContent/contexts/PresenceConfirmationContext';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventServerService().getBySlug(slug);
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
      <EventPageBase>
        <PresenceConfirmationProvider event={event}>
          <PresenceConfirmationContent />
        </PresenceConfirmationProvider>
      </EventPageBase>
    </ToastProvider>
  );
}
