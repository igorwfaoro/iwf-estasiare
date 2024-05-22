import { Metadata } from 'next';
import { cache } from 'react';

import { createEventServerService } from '../../../../../services/server/event.server-service';
import { createHandbookServerService } from '../../../../../services/server/handbook.server-service';
import EventPageBase from '../../components/EventPageBase/EventPageBase';
import Header from './components/Header/header';

interface HandbookPageProps {
  params: { id: number; slug: string };
}

export const revalidate = 3600;

const getData = cache(async (slug: string, id: number) => {
  const event = await createEventServerService().getBySlug(slug, {
    handbooks: true
  });

  const handbook = await createHandbookServerService().getById(id);

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
        <div
          className="prose max-w-2xl w-full"
          dangerouslySetInnerHTML={{ __html: handbook.content }}
        />
      </div>
    </EventPageBase>
  );
}
