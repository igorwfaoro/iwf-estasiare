import { EventType } from '.prisma/client';
import { EventAddressCreateInputModel } from './event-address-create.input-model';
import { EventContentCreateInputModel } from './event-content-create.input-model';
import { EventWeddingDetailCreateInputModel } from './event-wedding-detail-create.input-model';

export interface EventCreateInputModel {
  eventType: EventType;
  date: string;
  address: EventAddressCreateInputModel;
  content: EventContentCreateInputModel;
  weddingDetail?: EventWeddingDetailCreateInputModel;
}
