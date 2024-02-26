import { EventType } from '@prisma/client';

export interface GenericEventParams {
  eventType: EventType;
  weddingDetail?: {
    groomName: string;
    brideName: string;
  } | null;
  content?: {
    primaryColor?: string;
  };
}
