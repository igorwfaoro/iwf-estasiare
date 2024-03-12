import { EventContentImageViewModel } from './event-content-image.view-model';

export interface EventContentViewModel {
  id: number;
  primaryColor: string;
  bannerImage: string | null;
  logoImage: string | null;
  spotifyPlaylistUrl: string | null;
  images: EventContentImageViewModel[] | undefined;
}
