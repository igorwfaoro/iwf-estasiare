import { EventType } from '@prisma/client';

import { EventContactInfoViewModel } from './event-contact-info.view-model';
import { EventContentViewModel } from './event-content.view-model';
import { EventFinancialViewModel } from './event-financial.view-model';
import { EventHandbookViewModel } from './event-handbook.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';
import { GiftViewModel } from './gift.view-model';

export interface EventDetailViewModel {
  id: number;
  eventType: EventType;
  date: string;
  address: string;
  slug: string;
  content?: EventContentViewModel;
  financial?: EventFinancialViewModel;
  contactInfo?: EventContactInfoViewModel;
  gifts?: GiftViewModel[];
  handbooks?: EventHandbookViewModel[] | null;
  createdAt: string;
  weddingDetail?: EventWeddingDetailViewModel | null;

  titleDescription: string;
  hasGifts?: boolean | null;
  hasInvitations?: boolean | null;
  hasHandbooks?: boolean | null;
}
