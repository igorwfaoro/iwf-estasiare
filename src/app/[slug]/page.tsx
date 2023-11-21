import { cache } from 'react';
import { Metadata } from 'next';
import HomeBanner, { HomeBannerProps } from './components/HomeBanner';
import { createEventService } from '../../app-services/event.service';
import HomeHeader from './components/HomeHeader';
import HomeInfo from './components/HomeInfo';
import HomePhotoAlbum from './components/HomePhotoAlbum';
import HomePlaylist from './components/HomePlaylist';
import HomeMap from './components/HomeMap';

export const revalidate = 3600;

const getEvent = cache(async (slug: string) => {
  return await createEventService().getBySlug(slug);
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: event.titleDescription,
  };
}

export default async function EventSite({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  const banners = {
    gifts: {
      title: 'Lista de Presentes Especiais',
      description:
        'Nossa celebração está se aproximando, e estamos felizes em compartilhá-la com vocês. Se desejarem nos presentear de maneira simbólica, confiram nossa lista de presentes especiais',
      buttonText: 'Lista de presentes',
      imageSrc: '/images/banner1.jpg',
      buttonLink: `/${event.slug}/gifts`,
      direction: 'row',
    } as HomeBannerProps,
    presenceConfirmation: {
      title: 'Confirmação de Presença',
      description:
        'Confirme sua presença em nossa celebração especial. Estamos ansiosos para compartilhar este momento com você!',
      buttonText: 'Lista de presentes',
      imageSrc: '/images/banner1.jpg',
      buttonLink: `/${event.slug}/gifts`,
      direction: 'row',
    } as HomeBannerProps,
  };

  return (
    <div>
      <HomeHeader event={event} />
      <HomeInfo event={event} />

      <HomeBanner {...banners.gifts} />

      {!!event.content.images.length && (
        <HomePhotoAlbum images={event.content.images} />
      )}

      <HomeBanner {...banners.presenceConfirmation} />

      {event.content.spotifyPlaylistUrl && (
        <HomePlaylist
          spotifyPlaylistUrl={event.content.spotifyPlaylistUrl}
        />
      )}

      <HomeMap />
    </div>
  );
}
