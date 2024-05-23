import { Metadata } from 'next';
import { ReactNode, Suspense, cache } from 'react';

import { createEventServerService } from '../../../services/server/event.server-service';
import Loading from '../../loading';
import { EventFooter } from './components/Footer/Footer';
import { EventNavbar } from './components/Navbar/Navbar';

interface LayoutProps {
  params: { eventSlug: string };
  children: ReactNode;
}

const getEvent = cache(async (eventSlug: string) => {
  return await createEventServerService().getBySlug(eventSlug, {
    contactInfo: true
  });
});

export async function generateMetadata({
  params
}: {
  params: { eventSlug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    description: event.titleDescription,
    robots: 'index',
    themeColor: event.content?.primaryColor,
    openGraph: {
      description: event.titleDescription,
      ...(event.content?.bannerImage && {
        images: event.content.bannerImage
      }),
      type: 'website',
      siteName: `Estasiare`
    },
    twitter: {
      title: event.titleDescription,
      description: `${event.titleDescription} | Estasiare`,
      card: 'summary',
      ...(event.content?.bannerImage && { images: event.content.bannerImage })
    }
  };
}

export default async function EventLayout({ params, children }: LayoutProps) {
  const event = await getEvent(params.eventSlug);

  return (
    <>
      <EventNavbar event={event} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <EventFooter event={event} />
    </>
  );
}
