import { ReactNode, cache } from 'react';
import { createEventService } from '../../app-services/event.service';
import { EventNavbar } from './components/Navbar';
import { EventFooter } from './components/Footer';

interface LayoutProps {
  params: { slug: string };
  children: ReactNode;
}

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

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
