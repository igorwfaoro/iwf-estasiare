import { EventType } from '@prisma/client';
import { EventContentViewModel } from './event-content.view-model';
import { EventFinancialViewModel } from './event-financial.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';
import { GiftViewModel } from './gift.view-model';
import { EventHandbookViewModel } from './event-handbook.view-model';

export interface EventDetailViewModel {
  id: number;
  eventType: EventType;
  date: string;
  address: string;
  slug: string;
  content?: EventContentViewModel;
  financial?: EventFinancialViewModel | null;
  weddingDetail?: EventWeddingDetailViewModel | null;
  gifts?: GiftViewModel[];
  handbooks?: EventHandbookViewModel[] | null;
  createdAt: string;

  titleDescription: string;
  hasGifts?: boolean | null;
  hasInvitations?: boolean | null;
  hasHandbooks?: boolean | null;
}
