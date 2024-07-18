import { Metadata } from 'next';
import { cache } from 'react';

import AddressMap from '../../../components/AddressMap/AddressMap';
import { createEventServerService } from '../../../services/server/event.server-service';
import { getEventPublicUrl } from '../../../util/helpers/event.helper';
import EventBanner, {
  EventBannerProps
} from './components/EventBanner/EventBanner';
import EventHeader from './components/EventHeader/EventHeader';
import EventInfo from './components/EventInfo/EventInfo';
import EventPhotoAlbum from './components/EventPhotoAlbum/EventPhotoAlbum';
import EventPlaylist from './components/EventPlaylist/EventPlaylist';

export const revalidate = 3600;

const getEvent = cache(async (eventSlug: string) => {
  return await createEventServerService().getBySlug(eventSlug);
});

export async function generateMetadata({
  params
}: {
  params: { eventSlug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: event.titleDescription
  };
}

export default async function Event({
  params
}: {
  params: { eventSlug: string };
}) {
  const event = await getEvent(params.eventSlug);

  const banners = {
    gifts: {
      title: 'Lista de Presentes Especiais',
      description:
        'Nossa celebração está se aproximando, e estamos felizes em compartilhá-la com vocês. Se desejarem nos presentear de maneira simbólica, confiram nossa lista de presentes especiais',
      buttonText: 'Lista de presentes',
      imageSrc: '/images/event/banner1.jpg',
      buttonLink: `${getEventPublicUrl(event.slug)}/gifts`
    } as EventBannerProps,
    presenceConfirmation: {
      title: 'Confirmação de Presença',
      description:
        'Confirme sua presença em nossa celebração especial. Estamos ansiosos para compartilhar este momento com você!',
      buttonText: 'Confirmação',
      imageSrc: '/images/event/banner2.jpg',
      buttonLink: `${getEventPublicUrl(event.slug)}/presence-confirmation`
    } as EventBannerProps,
    handbooks: {
      title: 'Manuais',
      description:
        'Aqui, você encontrará uma coleção de guias úteis para diversos aspectos do nosso evento especial',
      buttonText: 'Acessar',
      imageSrc: '/images/event/banner3.jpg',
      buttonLink: `${getEventPublicUrl(event.slug)}/handbooks`
    } as EventBannerProps
  };

  return (
    <div>
      <EventHeader event={event} />
      <EventInfo event={event} />

      {event.hasGifts && <EventBanner {...banners.gifts} />}

      {!!event.content?.images?.length && (
        <EventPhotoAlbum images={event.content.images} />
      )}

      {event.hasInvitations && (
        <EventBanner
          {...banners.presenceConfirmation}
          contentClassName="backdrop-brightness-150"
        />
      )}

      {event.content?.spotifyPlaylistUrl && (
        <EventPlaylist spotifyPlaylistUrl={event.content.spotifyPlaylistUrl} />
      )}

      {event.hasHandbooks && <EventBanner {...banners.handbooks} />}

      <AddressMap address={event.address!} />
    </div>
  );
}
