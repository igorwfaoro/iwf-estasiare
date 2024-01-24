import { cache } from 'react';
import { createHandbookService } from '../../../../app-services/handbook.service';
import { createEventService } from '../../../../app-services/event.service';
import EventPageBase from '../../components/EventPageBase/EventPageBase';
import { Metadata } from 'next';
import Header from './components/Header/header';
import Markdown from 'react-markdown';

interface HandbookPageProps {
  params: { id: number; slug: string };
}

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug, { handbooks: true });
});

const getHandbook = cache(async (id: number) => {
  return await createHandbookService().getById(id);
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
      <Markdown className="prose">{handbook.content}</Markdown>
    </EventPageBase>
  );
}
