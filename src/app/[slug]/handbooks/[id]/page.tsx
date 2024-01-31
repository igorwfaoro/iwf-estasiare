import { cache } from 'react';
import { createHandbookServerService } from '../../../../services/server/handbook.server-service';
import { createEventServerService } from '../../../../services/server/event.server-service';
import EventPageBase from '../../components/EventPageBase/EventPageBase';
import { Metadata } from 'next';
import Header from './components/Header/header';

interface HandbookPageProps {
  params: { id: number; slug: string };
}

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventServerService().getBySlug(slug, { handbooks: true });
});

const getHandbook = cache(async (id: number) => {
  return await createHandbookServerService().getById(id);
});

export async function generateMetadata({
  params
}: {
  params: { id: number; slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);
  const handbook = await getHandbook(params.id);

  return {
    title: `${handbook.title} | ${event.titleDescription}`
  };
}

export default async function HandbookPage({ params }: HandbookPageProps) {
  const event = await getEvent(params.slug);
  const handbook = await getHandbook(params.id);

  return (
    <EventPageBase>
      <Header event={event} handbook={handbook} />
      <div className='text-center' dangerouslySetInnerHTML={{ __html: handbook.content }} />
    </EventPageBase>
  );
}
