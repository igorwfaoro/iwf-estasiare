import { EventType } from '.prisma/client';

export type EventUpdateInputModel = Partial<Event>;

interface Event {
  eventType: EventType;
  date: string;
  address: string;

  content: Partial<Content>;
  financial: Partial<Financial>;
  weddingDetail: Partial<WeddingDetail>;
}

interface Financial {
  paypalBusinessCode: string;
}

interface Content {
  primaryColor: string;
  bannerImage: string;
  logoImage: string;
  spotifyPlaylistUrl: string;
}

interface WeddingDetail {
  brideName: string;
  groomName: string;
}
