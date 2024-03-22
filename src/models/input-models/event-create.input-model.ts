import { EventType } from '.prisma/client';

export interface EventCreateInputModel {
  eventType: EventType;
  date: string;
  address: string;
  content: Content;
  weddingDetail?: WeddingDetail;
}

interface Content {
  primaryColor: string;
}

interface WeddingDetail {
  brideName: string;
  groomName: string;
}
