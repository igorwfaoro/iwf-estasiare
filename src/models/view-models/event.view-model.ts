import { EventType } from '@prisma/client';

import { EventContentViewModel } from './event-content.view-model';
import { EventFinancialViewModel } from './event-financial.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';

export interface EventViewModel {
  id: number;
  eventType: EventType;
  date: string;
  address: string;
  slug: string;
  content?: EventContentViewModel;
  financial?: EventFinancialViewModel | null;
  weddingDetail?: EventWeddingDetailViewModel | null;
  createdAt: string;

  titleDescription: string;
}
