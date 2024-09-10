import { EventType } from '@prisma/client';
import { AddressInputModel } from './address.input-model';

export interface EventCreateInputModel {
  eventType: EventType;
  date: string;
  address: Address;
  content: Content;
  weddingDetail?: WeddingDetail;
}

type Address = AddressInputModel & {
  formattedAddress: string;
  latitude: number;
  longitude: number;
};

interface Content {
  primaryColor: string;
}

interface WeddingDetail {
  brideName: string;
  groomName: string;
}
