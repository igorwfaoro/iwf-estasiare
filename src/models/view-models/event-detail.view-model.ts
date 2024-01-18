import { EventType } from '@prisma/client';
import { EventContentViewModel } from './event-content.view-model';
import { EventFinancialViewModel } from './event-financial.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';
import { GiftViewModel } from './gift.view-model';
import { EventAddressViewModel } from './event-address.view-model';
import { EventHandbookViewModel } from './event-handbook.view-model';

export interface EventDetailViewModel {
  id: number;
  eventType: EventType;
  date: Date;
  slug: string;
  address?: EventAddressViewModel;
  content?: EventContentViewModel;
  financial?: EventFinancialViewModel | null;
  weddingDetail?: EventWeddingDetailViewModel | null;
  gifts?: GiftViewModel[];
  handbooks?: EventHandbookViewModel[] | null;
  createdAt: Date;

  titleDescription: string;
  hasGifts?: boolean | null;
  hasInvitations?: boolean | null;
  hasHandbooks?: boolean | null;
}
