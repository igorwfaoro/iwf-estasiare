import { EventType, PixKeyType } from '@prisma/client';
import { AddressInputModel } from './address.input-model';

export type EventUpdateInputModel = Partial<Event>;

interface Event {
  eventType: EventType;
  date: string;

  address: Partial<AddressInputModel>;
  content: Partial<Content>;
  financial: Partial<Financial>;
  contactInfo: Partial<ContactInfo>;
  weddingDetail: Partial<WeddingDetail>;
}

interface Financial {
  paypalBusinessCode: string;
  pixType: PixKeyType;
  pixKey: string;
  pixDescription: string;
}

interface Content {
  primaryColor: string;
  bannerImage: string;
  logoImage: string;
  spotifyPlaylistUrl: string | null;
}

interface ContactInfo {
  description: string | null;
  phoneNumber: string | null;
  whatsAppNumber: string | null;
  email: string | null;
}

interface WeddingDetail {
  brideName: string;
  groomName: string;
  giftRegistries: Partial<WeddingDetailGiftRegistries>[];
}

interface WeddingDetailGiftRegistries {
  id: number;
  storeName: string;
  description: string;
  url: string;
}
