import { cache } from 'react';
import EventPageBase from '../../components/EventPageBase/EventPageBase';
import { Metadata } from 'next';
import Header from './components/Header/header';
import Markdown from 'react-markdown';
import { createEventClientService } from '../../../../services/client/event.client-service';
import { createHandbookClientService } from '../../../../services/client/handbook.client-service';

interface HandbookPageProps {
  params: { id: number; slug: string };
}

export const revalidate = 3600;

const getData = cache(async (slug: string, id: number) => {
  const event = await createEventClientService().getBySlug(slug, {
    handbooks: true
  });

  const handbook = await createHandbookClientService().getById(event.id, id);

  return {
    event,
    handbook
  };
});

export async function generateMetadata({
  params
}: {
  params: { id: number; slug: string };
}): Promise<Metadata> {
  const { event, handbook } = await getData(params.slug, params.id);

  return {
    title: `${handbook.title} | ${event.titleDescription}`
  };
}

export default async function HandbookPage({ params }: HandbookPageProps) {
  const { event, handbook } = await getData(params.slug, params.id);

  return (
    <EventPageBase>
      <Header event={event} handbook={handbook} />

      <div className="flex flex-col items-center">
        <Markdown className="prose">{handbook.content}</Markdown>
      </div>
    </EventPageBase>
  );
}
