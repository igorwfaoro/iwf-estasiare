import { cache } from 'react';
import { Metadata } from 'next';
import HomeBanner, { HomeBannerProps } from './components/HomeBanner';
import { createEventService } from '../../app-services/event.service';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomeHeader from './components/HomeHeader';
import HomeInfo from './components/HomeInfo';

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
    title: event.titleDescription,
  };
}

export default async function EventSite(params: { slug: string }) {
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
  };

  return (
    <div>
      <Navbar event={event} />
      <HomeHeader event={event} />
      <HomeInfo event={event} />
      <HomeBanner {...banners.gifts} />
      {/* <HomePhotoAlbum /> */}
      {/* <HomePlaylist /> */}
      {/* <HomeMap event={event} /> */}
      <Footer />
    </div>
  );
}
