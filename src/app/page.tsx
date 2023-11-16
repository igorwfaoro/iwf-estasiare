import { createInfoService } from '../app-services/info.service';
import { cache } from 'react';
import HomeHeader from './components/HomeHeader';
import HomeInfo from './components/HomeInfo';
import { Metadata } from 'next';
import HomeMap from './components/HomeMap';
import HomeActions, { HomeBannerProps } from './components/HomeBanner';
import HomePhotoAlbum from './components/HomePhotoAlbum';
import HomePlaylist from './components/HomePlaylist';

export const revalidate = 3600;

const getInfo = cache(async () => {
  return await createInfoService().getInfo();
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const info = await getInfo();

  return {
    title: `${info.groomName} & ${info.brideName} | Wedding`,
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

export default async function Home() {
  const info = await getInfo();

  return (
    <div>
      <HomeHeader info={info} />
      <HomeInfo info={info} />
      <HomeActions {...banners.gifts} />
      {/* <HomeActions {...banners.presenceConfirmation} /> */}
      <HomePhotoAlbum />
      <HomePlaylist />
      <HomeMap />
    </div>
  );
}
