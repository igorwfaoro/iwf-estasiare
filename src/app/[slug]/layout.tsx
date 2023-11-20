import { ReactNode, cache } from 'react';
import { createEventService } from '../../app-services/event.service';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

interface LayoutProps {
  params: { slug: string };
  children: ReactNode;
}

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

export default async function SlugLayout({ params, children }: LayoutProps) {
  const event = await getEvent(params.slug);

  return (
    <>
      <Navbar event={event} />
      {children}
      <Footer />
    </>
  );
}
