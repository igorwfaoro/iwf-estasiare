import { ReactNode, cache } from 'react';
import { EventNavbar } from './components/Navbar/Navbar';
import { EventFooter } from './components/Footer/Footer';
import { Metadata } from 'next';
import { createEventServerService } from '../../services/server/event.server-service';

interface LayoutProps {
  params: { slug: string };
  children: ReactNode;
}

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
    description: event.titleDescription,
    robots: 'index',
    themeColor: event.content?.primaryColor,
    openGraph: {
      description: event.titleDescription,
      ...(event.content?.logoImage && {
        images: event.content.logoImage
      }),
      type: 'website',
      siteName: `Eventy`
    },
    twitter: {
      title: event.titleDescription,
      description: `${event.titleDescription} | Eventy`,
      card: 'summary',
      ...(event.content?.logoImage && { images: event.content.logoImage })
    }
  };
}

export default async function EventLayout({ params, children }: LayoutProps) {
  const event = await getEvent(params.slug);

  return (
    <>
      <EventNavbar event={event} />
      {children}
      <EventFooter />
    </>
  );
}
