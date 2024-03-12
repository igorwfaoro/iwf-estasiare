import { EventType } from '.prisma/client';

export interface EventCreateInputModel {
  eventType: EventType;
  date: string;
  address: Address;
  content: Content;
  weddingDetail?: WeddingDetail;
}

interface Address {
  shortDescription: string;
  fullDescription: string;
}

interface Content {
  primaryColor: string;
}

interface WeddingDetail {
  brideName: string;
  groomName: string;
}
