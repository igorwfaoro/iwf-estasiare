import { EventContentImageViewModel } from './event-content-image.view-model';

export interface EventContentViewModel {
  id: number;
  primaryColor: string;
  bannerImage: string;
  logoImage: string | null;
  icon: string | null;
  spotifyPlaylistUrl: string | null;
  images: EventContentImageViewModel[] | undefined;
}
