import { EventType } from '@prisma/client';
import { EventContentViewModel } from './event-content.view-model';
import { EventFinancialViewModel } from './event-financial.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';
import { GiftViewModel } from './gift.view-model';
import { EventAddressViewModel } from './event-address.view-model';

export interface EventViewModel {
  id: number;
  eventType: EventType;
  date: Date;
  slug: string;
  address?: EventAddressViewModel;
  content?: EventContentViewModel;
  financial?: EventFinancialViewModel | null;
  weddingDetail?: EventWeddingDetailViewModel | null;
  gifts?: GiftViewModel[];
  createdAt: Date;

  titleDescription: string;
}
