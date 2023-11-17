import { cache } from 'react';
import HomeHeader from './components/HomeHeader';
import HomeInfo from './components/HomeInfo';
import { Metadata } from 'next';
import HomeMap from './components/HomeMap';
import HomeActions, { HomeBannerProps } from './components/HomeBanner';
import HomePhotoAlbum from './components/HomePhotoAlbum';
import HomePlaylist from './components/HomePlaylist';
import { MainLayout } from './components/MainLayout';
import { createEventService } from '../../app-services/event.service';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await createEventService().getBySlug(params.slug);

  return {
    title: `${event.eventType}`,
  };
}

const banners = {
  gifts: {
    title: 'Nossa Lista de Presentes Especiais',
    description:
      'Nossa celebração está se aproximando, e estamos felizes em compartilhá-la com vocês. Se desejarem nos presentear de maneira simbólica, confiram nossa lista de presentes especiais',
    buttonText: 'Lista de presentes',
    imageSrc: '/images/banner1.jpg',
    buttonLink: '/gifts',
    direction: 'row',
  } as HomeBannerProps,
  // presenceConfirmation: {
  //   title: 'Confirme sua presença',
  //   description:
  //     'Gostaríamos muito de contar com a sua presença em nossa celebração. Por favor, confirme sua presença. Mal podemos esperar para compartilhar este momento especial com você!',
  //   buttonText: 'Confirmação',
  //   imageSrc: '/images/banner2.jpg',
  //   buttonLink: '/presence-confirmation',
  //   direction: 'row',
  // } as HomeBannerProps,
};

export default async function EventSite(params: { slug: string }) {
  const event = await getEvent(params.slug);

  return (
    <MainLayout>
      <pre>{JSON.stringify(event, null, 4)}</pre>
      {/* <HomeHeader info={info} />
      <HomeInfo info={info} />
      <HomeActions {...banners.gifts} />
      <HomePhotoAlbum />
      <HomePlaylist />
      <HomeMap /> */}
    </MainLayout>
  );
}
